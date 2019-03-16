import React, { memo } from "react"
// interface
import { IHouse, IVendor } from '../../appInterfaces';
// component
import TableRow from "./Row";

interface ITableProps {
    vendor: IVendor;
    columnsName: string[];
    style: React.CSSProperties;
    onChangePrice: (price: number, internalId: number, vendorName: string) => void;
}

const Table = (props: ITableProps) => {
    return <div
        style={props.style}
    >

        <table>

            <thead>
                <tr>
                    {
                        props.columnsName.map((colName, colIndex) => <th key={colIndex}>{colName}</th>)
                    }
                </tr>
            </thead>

            <tbody>
                {
                    props.vendor.vendorData.houses.map((house: IHouse) => {
                        return <TableRow
                            house={house}
                            onChangePrice={props.onChangePrice}
                        />
                    })
                }
            </tbody>

        </table>

    </div>
}

export default memo(Table);