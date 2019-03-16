export interface IParsedResult {
    payload: any;
    results: any[];
}

export interface IVendorIdentity {
    name: string;
    logo: {
        "max-140x50": string;
        original: string;
    }
}

export interface IHouse extends IVendorIdentity {
    displayName: string;
    internalId: number;
    imageSrc: string;
    name: string;
    price: number;
    livingAreaTotal: number;
}

export interface IVendor{
    vendorData: {
        identity: IVendorIdentity;
        houses: IHouse[];
    }
}

export interface IAppProps {

}

export interface IAppState {
    vendors: IVendor[];
}