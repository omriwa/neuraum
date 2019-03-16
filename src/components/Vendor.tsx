import React, { memo } from "react";
// interface
import { IVendor } from '../appInterfaces';
// components
import Table from './table/Table';

interface IVendorProps {
    vendor: IVendor;
    onChangePrice: (price: number, internalId: number, vendorName: string) => void;
}

const Vendor = (props: IVendorProps) => {
    const tableStyle = {
        height: 300,
        overflowY: "scroll" as "scroll"
    }

    return <div
        key={props.vendor.vendorData.identity.name}
        className="vendor-section"
    >
        <hr />
        <div>
            <img
                src={props.vendor.vendorData.identity.logo["max-140x50"]}
            />
            <span>
                {props.vendor.vendorData.identity.name}
            </span>
        </div>

        <Table
            vendor={props.vendor}
            columnsName={
                [
                    "House ID",
                    "Image",
                    "Name",
                    "Price",
                    "Size",
                ]
            }
            style={tableStyle}
            onChangePrice={props.onChangePrice}
/>

    </div>
}

export default memo(Vendor);