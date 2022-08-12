import React from "react";
import { UserStatus } from "./user.model";
import { FilterChangeListener, FilterType } from "./UserApp";
import './UserFilter.css'

interface TodoFilterProps {
    filter: FilterType;
    onFilterChange: FilterChangeListener;

}

export default function TodoFilter({filter, onFilterChange}: TodoFilterProps) {
    function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onFilterChange(event.target.value === '0' ? undefined : parseInt(event.target.value))
    }
    // function handleFilterChange1(event: React.ChangeEvent<HTMLSelectElement>) {
    //     onFilterChange1(event.target.value === '0' ? undefined : parseInt(event.target.value))
    // }
    return (
        <select className="TodoFilter" value={filter} onChange={handleFilterChange}>
            <option value="0">All</option>
            <option value={UserStatus.ACTIVE}>Active</option>
            <option value={UserStatus.SUSPENDED}>Suspended</option>
            <option value={UserStatus.DEACTIVATED}>Deactivated</option>
        </select> 
    );
}
