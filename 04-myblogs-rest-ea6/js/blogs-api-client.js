
const API_BASE_URL = "http://localhost:4000/api/posts"

export async function getAllPosts () {
    try {
        const postsResp = await fetch(API_BASE_URL);
        if(postsResp.status >= 400) {
            return Promise.reject(postsResp.body);
        } 
        return postsResp.json();
    } catch(err) {
        return Promise.reject(err);
    }
}

export async function addNewPost (post) {
    try {
        const postResp = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        });
        if(postResp.status >= 400) {
            return Promise.reject(postResp.body);
        } 
        return postResp.json();
    } catch(err) {
        return Promise.reject(err);
    }
}


// export async function editPostFromBlogs (post) {
//     try {
//         const postResp = await fetch(API_BASE_URL, {
//             method: 'PUT',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(post)
//         });
//         if(postResp.status >= 400) {
//             return Promise.reject(postResp.body);
//         } 
//         return postResp.json();
//     } catch(err) {
//         return Promise.reject(err);
//     }
// }

export async function editPostFromBlogs(postId) {
    try {
    const postResp = await fetch(`${API_BASE_URL}/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postId)
    });
    if(postResp.status >= 400) {
      return Promise.reject(postResp.body);
  }
  return postResp.json();
  } catch(err) {
  return Promise.reject(err);
  }
  }

export async function deleteFromBlogs(postId) {
    try {
      const postResp = await fetch(`${API_BASE_URL}/${postId}`, {
        method: "DELETE",
      });
  
      if (postResp.status >= 400) {
        return Promise.reject(postResp.body);
      }
      return postResp.json();
    } catch (err) {
      return Promise.reject(err);
    }
  }

