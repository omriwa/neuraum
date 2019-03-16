import React, { useState, memo } from "react";

export interface IFilterProps {
    name: string;
    onSort: (increase: boolean) => void;
}

const Filter = (props: IFilterProps) => {
    const [filterMode, setFilterMode] = useState(0);
    const onClick = () => {
        let newFilterMode;

        switch (filterMode) {
            case 0:
                newFilterMode = 1;
                break;
            case 1:
                newFilterMode = -1;
                break;
            case -1:
                newFilterMode = 0;
                break;
        }

        setFilterMode(newFilterMode);

        if (newFilterMode !== 0) {
            props.onSort(newFilterMode === 1);
        }
    };
    return <span
        className="filter"
        onClick={onClick}
    >

        <span>
            {
                props.name
            }
        </span>

        <span>
            {
                filterMode === 1 ? "↑" : ""
            }
            {
                filterMode === -1 ? "↓" : ""
            }
        </span>

    </span>
}

export default memo(Filter);