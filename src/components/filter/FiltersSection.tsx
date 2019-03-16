import React, { memo } from "react";
// interface
import { IFilterProps } from "./Filter";
// components
import Filter from "./Filter";

export interface IFilterSectionProps {
    filters: IFilterProps[];
}

const FilterSection = (props: IFilterSectionProps) => {
    return <div
        className="filter-section"
    >
        {
            props.filters.map(filter => <Filter
                key={filter.name}
                name={filter.name}
                onSort={filter.onSort}
            />
            )
        }
    </div>
}

export default memo(FilterSection);