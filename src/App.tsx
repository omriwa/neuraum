import React, { Component } from 'react';
// interfaces
import * as IAppInterfaces from "./appInterfaces";
// components
import Table from "./components/table/Table";
import Vendor from './components/Vendor';

class App extends Component<IAppInterfaces.IAppProps, IAppInterfaces.IAppState> {
    constructor(props) {
        super(props);

        this.state = {
            vendors: []
        }
    }

    componentDidMount() {
        // fetch data
        fetch("http://localhost:1337/houses")
            .then(result => result.json())
            .then((parsedResult: IAppInterfaces.IParsedResult) => {
                //fit houses data
                const houses = parsedResult.results.map(house => this.getHouses(house));
                // create vendors
                let vendors = {};

                for (const house of houses) {
                    if (vendors[house.displayName]) {
                        vendors[house.displayName].push(house);
                    }
                    else {
                        vendors[house.displayName] = [house];
                    }
                }
                //set state
                this.setState({
                    vendors: this.getVendors(vendors)
                });
            });
    }

    private getVendors= (vendors: any): IAppInterfaces.IVendor[] => {
        return (Object as any).keys(vendors).map(vendorKey => {
            return this.getSingleVendor(
                {
                    logo: vendors[vendorKey][0].logo,
                    name: vendorKey
                },
                vendors[vendorKey]
            );
        });
    }

    private getSingleVendor(identity: IAppInterfaces.IVendorIdentity, houses: IAppInterfaces.IHouse[]): IAppInterfaces.IVendor {
        return {
            vendorData: {
                identity: identity,
                houses: houses
            }
        }
    }

    private getHouses(house: any): IAppInterfaces.IHouse {
        return {
            displayName: house.vendor_verbose.display_name,
            logo: house.vendor_verbose.logo,
            internalId: house.internal_id,
            name: house.name,
            imageSrc: house.exterior_images[0]["fill-320x240"],
            price: house.price,
            livingAreaTotal: house.living_area_total
        }
    }

    private onChangePrice = (price: number, internalId: number, vendorName: string): void => {
        const newVendors = [...this.state.vendors],
            vendorIndex = this.state.vendors.findIndex(
            (vendor: IAppInterfaces.IVendor) => vendor.vendorData.identity.name === vendorName
        ),
            vendorCopy = { ...this.state.vendors[vendorIndex] },
            houseIndex = vendorCopy.vendorData.houses.findIndex((house: IAppInterfaces.IHouse) => house.internalId === internalId),
            houseCopy = { ...vendorCopy.vendorData.houses[houseIndex] };
        // change the price of the house
        houseCopy.price = price;
        // replace the house copy in vendor copy
        vendorCopy.vendorData.houses[houseIndex] = houseCopy;
        // replace vendor in vendors
        newVendors[vendorIndex] = vendorCopy;
        // set state
        this.setState({
            vendors: newVendors
        });
    }

    render() {
        return (
            <div className="App">
                {
                    this.state.vendors.map(singleVendor => {
                        return <Vendor
                            key={singleVendor.vendorData.identity.name}
                            vendor={singleVendor}
                            onChangePrice={this.onChangePrice}
                        />
                    })
                }
            </div>
        );
    }
}

export default App;
