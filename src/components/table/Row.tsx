import React, { useState, memo, ChangeEvent } from "react";
// interface
import { IHouse } from '../../appInterfaces';

interface ITableRowProps {
    house: IHouse;
    onChangePrice: (price: number, internalId: number, vendorName: string) => void;
}

const TableRow = (props: ITableRowProps) => {
    const [isInput, toggleInput] = useState(false);

    return <tr
        key={props.house.internalId}
    >
        <td>
            {props.house.internalId}
        </td>

        <td>
            <img
                src={props.house.imageSrc}
            />
        </td>

        <td>
            {props.house.name}
        </td>

        <td
            onClick={() => toggleInput(!isInput)}
        >
            {
                isInput
                    ?
                    <input
                        autoFocus={true}
                        onClickCapture={() => toggleInput(!isInput)}
                        value={props.house.price}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const value = e.target.value,
                                newPrice = value === "" ? 0 : parseInt(value);

                            props.onChangePrice(newPrice, props.house.internalId, props.house.displayName);
                        }
                        }
                    />
                    :
                    <span
                        onClickCapture={() => toggleInput(!isInput)}
                    >
                        {props.house.price + " £"}
                    </span>
            }
        </td>

        <td>
            {props.house.livingAreaTotal + " sqm"}
        </td>

    </tr>;
}

export default memo(TableRow)