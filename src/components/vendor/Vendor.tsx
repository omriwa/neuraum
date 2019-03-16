import React, { memo } from "react";
// interface
import { IVendor } from '../../appInterfaces';
// components
import Table from '../table/Table';

interface IVendorProps {
    vendor: IVendor;
    onChangePrice: (price: number, internalId: number, vendorName: string) => void;
    columnsName: string[];
}

const Vendor = (props: IVendorProps) => {
    return <div
        key={props.vendor.vendorData.identity.name}
        className="vendor-section"
    >
        <hr />
        <div
            className="vendor-idendity"
        >
            <img
                src={props.vendor.vendorData.identity.logo["max-140x50"]}
            />
            <span>
                {props.vendor.vendorData.identity.name}
            </span>
        </div>

        <Table
            vendor={props.vendor}
            columnsName={props.columnsName}
            onChangePrice={props.onChangePrice}
/>

    </div>
}

export default memo(Vendor);