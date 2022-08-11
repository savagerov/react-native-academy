import { User, UserReg } from "./users.js";
import { IdType } from "./shared-types.js";

const API_BASE_URL = "http://localhost:4000/api/posts";

export interface UsersApiClient {
    getAllUsers(): Promise<User[]>;
    getUserById(id: IdType): Promise<User>;
    addNewUser(user: UserReg): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteUserById(id: IdType): Promise<User>;
}

class UserApiClientImpl implements UsersApiClient{
    // getAllUsers(): Promise<User[]> {
    //     throw new Error("Method not implemented.");
    // }
    // getUserById(id: IdType): Promise<User> {
    //     throw new Error("Method not implemented.");
    // }
    // addNewUser(user: UserReg): Promise<User> {
    //     throw new Error("Method not implemented.");
    // }
    // updateUser(user: User): Promise<User> {
    //     throw new Error("Method not implemented.");
    // }
    // deleteUserById(id: IdType): Promise<User> {
    //     throw new Error("Method not implemented.");
    // }   
    
    async getAllPosts(): Promise<User[]> {
        return this.handleRequest(API_BASE_URL);
    }

    async getPostById(id: IdType): Promise<User> {
        return this.handleRequest(`${API_BASE_URL}/${id}`);
    }

    async addNewPost(user: UserReg): Promise<User> {
        return this.handleRequest(API_BASE_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }

    async updatePost(user: User): Promise<User> {
        return this.handleRequest(`${API_BASE_URL}/${user.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        });
    }

    async deletePostById(id: IdType): Promise<User> {
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

