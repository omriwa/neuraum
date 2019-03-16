import React, { memo } from "react"
// interface
import { IHouse, IVendor } from '../../appInterfaces';
// component
import TableRow from "./Row";

interface ITableProps {
    vendor: IVendor;
    columnsName: string[];
    onChangePrice: (price: number, internalId: number, vendorName: string) => void;
}

const Table = (props: ITableProps) => {
    return <div
        className="table-container"
    >

        <table>

            <thead>
                <tr>
                    {
                        props.columnsName.map((colName, colIndex) => <th key={colIndex}>{colName}</th>)
                    }
                </tr>
            </thead>

        </table>

        <div
            className="t-body"
        >

        <table>

            <tbody>
                {
                    props.vendor.vendorData.houses.map((house: IHouse) => {
                        return <TableRow
                            key={house.internalId}
                            house={house}
                            onChangePrice={props.onChangePrice}
                        />
                    })
                }
            </tbody>

            </table>

        </div>

    </div>
}

export default memo(Table);