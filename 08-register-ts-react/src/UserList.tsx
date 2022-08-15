/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { useMemo } from "react";
import { User, UserStatus } from "./user.model";
import { FilterType, UserListener } from "./UserApp";
import UserItem from "./UserItem";
import './UserList.css'

interface Props {
    users: User[];
    filter: FilterType;
    onUpdate: UserListener;
    onDelete: UserListener;
    onEdit: UserListener;
    // onCreateUser: UserListener;
    // onCanceled: TodoListener;
}

export default function UserList({users, filter, ...rest}: Props) {
    const visibleUsers = (users: User[], filter: FilterType) => users.filter(user => !filter ? true : user.status === filter )
    const memizedVisibleUsers = useMemo(() => visibleUsers(users, filter) , [users,filter])
    return (<div className="UserList">
        {
            memizedVisibleUsers.map(user => 
                <UserItem user={user} key={user.id} {...rest} />)
        }
 
    </div>)
}