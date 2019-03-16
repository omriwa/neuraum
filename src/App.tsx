import React, { Component } from 'react';
// interfaces
import * as IAppInterfaces from "./appInterfaces";
// components
import * as AppComponents from "./components/index";
import FiltersSection from './components/filter/FiltersSection';
import { IFilterProps } from './components/filter/Filter';

class App extends Component<IAppInterfaces.IAppProps, IAppInterfaces.IAppState> {
    private columnsName: string[];
    private filtersKey: string[];

    constructor(props) {
        super(props);

        this.state = {
            vendors: []
        }
        // set cols name
        this.columnsName = [
            "House ID",
            "Image",
            "Name",
            "Price",
            "Size",
        ]
        // set filter keys
        this.filtersKey = [
            "internalId",
            "imageSrc",
            "name",
            "price",
            "livingAreaTotal"
        ];
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

    private getVendors = (vendors: any): IAppInterfaces.IVendor[] => {
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

    private onSort = (key: string, increase: boolean): void => {
        let vendorsCopy = [...this.state.vendors];
        // sort vendors houses
        vendorsCopy.forEach((vendor: IAppInterfaces.IVendor) => {
            if (typeof vendor.vendorData.houses[0][key] === "string") {
                vendor.vendorData.houses.sort(
                    (house1: IAppInterfaces.IHouse, house2: IAppInterfaces.IHouse) => (increase ? 1 : -1) * (house1[key] as string).localeCompare(house2[key])
                )
            }
            else {
                vendor.vendorData.houses.sort(
                    (house1: IAppInterfaces.IHouse, house2: IAppInterfaces.IHouse) => (increase ? 1 : -1) * (house1[key] - house2[key])
                )
            }
        });
        // deep copy
        vendorsCopy = JSON.parse(JSON.stringify(vendorsCopy))
        // set sorted vendors
        this.setState({
            vendors: vendorsCopy
        });
    } 

    render() {
        return (
            <div className="App">

                <div>
                    <FiltersSection
                        filters={
                            this.columnsName.map((name, i) => {
                                const filterProps: IFilterProps = {
                                    name,
                                    onSort: (increase: boolean) => this.onSort(this.filtersKey[i], increase)
                                };

                                return filterProps;
                            })
                        }
                    />
                </div>

                <div>
                {
                    this.state.vendors.map(singleVendor => {
                        return <AppComponents.Vendor
                            key={singleVendor.vendorData.identity.name}
                            columnsName={this.columnsName}
                            vendor={singleVendor}
                            onChangePrice={this.onChangePrice}
                        />
                    })
                    }
                </div>

            </div>
        );
    }
}

export default App;
