import React, { Component } from 'react';

interface IParsedResult {
    payload: any;
    results: any[];
}

interface IVendor {
    displayName: string;
    logo: {
        "max-140x50": string;
        original: string;
    };
    internalId: number;
    imageSrc: string;
    name: string;
    price: number;
    livingAreaTotal: number;
}

interface IAppProps {

}

interface IAppState {
    vendors: IVendor[];
}

class App extends Component<IAppProps, IAppState> {
    constructor(props) {
        super(props);

        this.state = {
            vendors:[]
        }
    }

    componentDidMount() {
        // fetch data
        fetch("http://localhost:1337/houses")
            .then(result => result.json())
            .then((parsedResult: IParsedResult) => {
                //fit vendor data
                const vendors = parsedResult.results.map(vendor => this.getVendor(vendor));
                //set state
                this.setState({
                    vendors
                },
                    () => console.log("state",this.state)
                );
            });
    }

    private getVendor(vendor: any): IVendor{
        return {
            displayName: vendor.vendor_verbose.display_name,
            logo: vendor.vendor_verbose.logo,
            internalId: vendor.internal_id,
            name: vendor.name,
            imageSrc: vendor.exterior_images[0]["fill-320x240"],
            price: vendor.price,
            livingAreaTotal: vendor.living_area_total
        }
    }
        
    
  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
