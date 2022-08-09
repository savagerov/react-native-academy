
import { Books } from "./books.js";

const API_BASE_URL = "http://localhost:4000/api/books"

export interface BlogsApiClient {
  getAllPosts(): Promise<Books[]>;
  getPostById(id: number) : Promise<Books>;
  addNewPost(post: Books): Promise<Books>;
  updatePost(post: Books): Promise<Books>;  
  deletePostById(id: number): Promise<Books>;  
}

class BlogApiClientImpl implements BlogsApiClient {
  async getAllPosts(): Promise<Books[]> {
      return this.handleRequest(API_BASE_URL);
      
    }
  async getPostById(id: number): Promise<Books> {
    throw new Error("Method not implemented.");

  }

  async addNewPost(post: Books): Promise<Books> {
    return this.handleRequest(API_BASE_URL, {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(post)
  });
  }

  async updatePost(post: Books): Promise<Books> {
    
    return this.handleRequest(`${API_BASE_URL}/${post.id}`, {
      method: 'PUT',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(post)
  });
  }

  async deletePostById(id: number): Promise<Books> {
    document.getElementById(`${id}`)!.remove();
    return this.handleRequest(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
  });
  }


  private async handleRequest(url: string, options?: RequestInit) {
        try {
            const postsResp = await fetch(url, options);
            if (postsResp.status >= 400) {
                return Promise.reject(postsResp.body);
            }
            return postsResp.json();
        } catch (err) {
            return Promise.reject(err);
        }
    } 
}

export const BlogsAPI: BlogsApiClient = new BlogApiClientImpl();