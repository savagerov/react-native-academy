/* eslint-disable no-template-curly-in-string */
/* eslint-disable jsx-a11y/img-redundant-alt */
import { User, UserStatus } from "./user.model";
import { FilterType, UserListener } from "./UserApp";
import UserItem from "./UserItem";
import './UserList.css'

interface Props {
    users: User[];
    filter: FilterType;
    onUpdate: UserListener;
    onDelete: UserListener;
    // onCreateUser: UserListener;
    // onCanceled: TodoListener;
}

export default function UserList({users, filter, ...rest}: Props) {
    return (<div className="UserList">
        {
        users.filter(user => !filter ? true : user.status === filter).map(user => 
            (<UserItem user={user} key={user.id} {...rest} />))
        }
 
        </div>)
}