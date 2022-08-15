/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { User, UserStatus, UserRole } from "./user.model"
import { UserListener } from "./UserApp";
import './UserItem.css'

interface UserItemProps {
    user: User;
    onUpdate: UserListener;
    onDelete: UserListener;
    onEdit: UserListener;
}

const UserItem = ({user, onUpdate , onDelete, onEdit}: UserItemProps) => {
    function handleCompletion(event: React.MouseEvent) {
        onUpdate({...user, status: UserStatus.SUSPENDED})
    }

    function handleCancel(event: React.MouseEvent) {
        onUpdate({ ...user, status: UserStatus.DEACTIVATED })
    }

    return (
        <div className="UserItem">
            <span className="UserItem-text">
                <span className="UserItem-id">{user.id}</span>
                {user.firstName} {user.lastName} - {user.username} - {user.password} {user.gender}
                <img className="UserItem-id" src={user?.userPicture} alt="Profile picture" />
            </span>
            <span className="UserItem-right">
                <span className="UserItem-status">{UserStatus[user.status]}</span>
                {user.status === UserStatus.ACTIVE ?
                    (<span className='Btn-first'><span className="UserItem-button fas fa-check-circle"
                        onClick={handleCompletion}></span>
                    <span className="UserItem-button fas fa-times-circle danger"
                        onClick={handleCancel}></span></span> ):
                    <span className="UserItem-button fas fa-times-circle danger"
                        onClick={() => onDelete(user)}></span>
                } 
                 <span className="TodoItem-button fas fa-pen-to-square"
                    onClick={() => onEdit(user)}></span>
            </span>
        </div >
    )
} 

export default UserItem;