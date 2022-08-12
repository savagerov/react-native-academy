import React, { Component } from 'react'
import { Gender, User } from './user.model';
import { UserListener } from './UserApp'
import './UserInput.css'

interface UserInputProps {
    onCreateUser: UserListener
}

interface UserInputState {
    password: string;
    username: string,
    firstName: string,
    lastName: string,
    date: string;
}

class UserInput extends Component<UserInputProps,UserInputState> {
    state: Readonly<UserInputState> = {
        password: '',
        username: '',
        firstName: '',
        lastName: '',
        date: new Date().toISOString(),    
    }
    handleUserSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        this.props.onCreateUser(new User(this.state.username, this.state.password, this.state.firstName, this.state.password,new Date(this.state.date)));
        this.setState({})
    }

    handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name as keyof HTMLInputElement & string; 
        const stateUpdate = {[fieldName]: event.target.value} as unknown as UserInputState
        this.setState(stateUpdate)
    }

    handleUserReset = (event: React.MouseEvent) => {
        event.preventDefault();
        this.setState({});
    }

    render() {
        return (
            <form className="UserInput-form" onSubmit={this.handleUserSubmit}>
                <label htmlFor="UserInput-user-text">First Name</label>
                <input type="text" id="UserInput-user-firstName" name="firstName" value={this.state.firstName} onChange={this.handleTextChanged} /><br />
                <label htmlFor="UserInput-user-text">Last Name</label>
                <input type="text" id="UserInput-User-lastName" name="lastName" value={this.state.lastName} onChange={this.handleTextChanged} /><br />
                <label htmlFor="UserInput-user-text">Username</label>
                <input type="text" id="UserInput-User-username" name="username" value={this.state.username} onChange={this.handleTextChanged} /><br />
                <label htmlFor="UserInput-user-text">Password</label>
                <input type="password" id="UserInput-user-password" name="password" value={this.state.password} onChange={this.handleTextChanged} /><br />
                <label htmlFor="UserInput-user-text">Gender</label>
                <input type="text" role="listbox" id="UserInput-user-gender" name="gender" value={this.state.password} onChange={this.handleTextChanged} />
                <label htmlFor="UserInput-user-text">Profile Picture</label>
                <img id="img" src="https://static.vecteezy.com/system/resources/thumbnails/005/571/769/small/default-avatars-photo-placeholders-profile-pictures-male-and-female-vector.jpg" alt="new"/>
                <input type="Url" id="TodoInput-user-text-url" name="url" value={this.state.}
                    onChange={this.handleTextChanged} placeholder="https://example.jpg/.png/.jpeg"/>
                <input type="url" id="UserInput-user-image" name="image"  onChange={this.handleTextChanged} /><br />
                <label htmlFor="UserInput-user-date">Pick a date</label>
                <input type="date" id="UserInput-user-date1" name="date" value={this.state.date} onChange={this.handleTextChanged} />
                <button className='button button5' type="submit">Submit User</button>
                <button className='button button3' type="reset" onClick={this.handleUserReset}>Reset Form</button>
            </form>  
        )
    }
}

export default UserInput