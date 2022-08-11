import { User, UserReg } from "./users.js";
import { IdType } from "./shared-types.js";

const API_BASE_URL = "http://localhost:4000/api/users";

export interface UsersApiClient {
    getAllUsers(): Promise<User[]>;
    getUserById(id: IdType): Promise<User>;
    addNewUser(user: UserReg): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUserById(id: IdType): Promise<User>;
}

class UserApiClientImpl {
    
    async getAllUsers(): Promise<User[]> {
        return this.handleRequest(API_BASE_URL);
    }

    async getUserById(id: IdType): Promise<User> {
        return this.handleRequest(`${API_BASE_URL}/${id}`);
    }

    async addNewUser(user: UserReg): Promise<User> {
        return this.handleRequest(API_BASE_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }

    async updateUser(user: User): Promise<User> {
        return this.handleRequest(`${API_BASE_URL}/${user.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }

    async deleteUserById(id: IdType): Promise<User> {
        return this.handleRequest(`${API_BASE_URL}/${id}`, {
            method: 'DELETE'
        });
    }

    private async handleRequest(url: string, options?: RequestInit) {
        try {
            const usersResp = await fetch(url, options);
            if (usersResp.status >= 400) {
                return Promise.reject(usersResp.body);
            }
            return usersResp.json();
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

export const UsersAPI: UsersApiClient = new UserApiClientImpl();

