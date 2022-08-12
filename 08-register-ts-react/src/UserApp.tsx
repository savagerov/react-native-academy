import React, {Component} from 'react';
import './App.css';
import { User, UserStatus} from './user.model';
import UserList from './UserList';
import UserFilter from './UserFilter';
import MOCK_USERS from './mock-users';
import UserInput from './UserInput';

export type FilterType = UserStatus | undefined;

interface UserAppState {
    users: User[];
  filter: FilterType;
}

export interface UserListener {
    (user: User): void;
}

export interface FilterChangeListener {
    (filter: FilterType) : void;
}

class UserApp extends Component<{} , UserAppState> {
    state: Readonly<UserAppState> = {
        users: MOCK_USERS,
        filter: undefined
    }

    constructor(props: {}) {
        super(props)
        this.handleUpdateUser = this.handleUpdateUser.bind(this);
    }

    

    handleUpdateUser(user:User) {
        this.setState(({users}) => ({users: users.map(td => td.id === user.id? user: td)}))
    }

    handleDeleteUser = (user: User) => {
        this.setState(({users}) => ({users: users.filter(td => td.id !== user.id)}))
    }

    handleCreateUser = (user: User) => {
        this.setState(({users}) => ({users: users.concat(user)}))
    }

    handlefilterChange = (status: FilterType) => {
        this.setState({filter: status})
    }


    render(): React.ReactNode {
        return (
            <div className="App">
                <header className="App-header">
                    <h2>TODO Demo</h2>
                    <UserInput onCreateUser={this.handleCreateUser}/>
                    <UserFilter filter={this.state.filter} onFilterChange={this.handlefilterChange} 
                    />
                    <UserList 
                     users={this.state.users}
                     filter={this.state.filter}
                     onUpdate={this.handleUpdateUser}
                     onDelete={this.handleDeleteUser}
                    />
                </header>
            </div>
        );
    }
}

export default UserApp;
