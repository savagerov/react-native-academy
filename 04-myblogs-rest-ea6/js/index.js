import { addNewPost, getAllPosts ,deleteFromBlogs, editPostFromBlogs  } from "./blogs-api-client.js";
import { chipsInstances } from "./materialize-helpers.js";

const postsSection = document.getElementById("posts");
const errorsDiv = document.getElementById("errors");
const addPostForm = document.getElementById("add-post-form");
addPostForm.addEventListener('submit', handleSubmitPost);
addPostForm.addEventListener('reset', resetform);


async function init() {
  try {
    const allPosts = await getAllPosts();
    showPosts(allPosts);
  } catch (err) {
    showError(err);
  }
}

export function showPosts(posts) {
  posts.forEach((post) => addPost(post));
}

export function showError(err) {
  errorsDiv.innerHTML = `<div>${err}</div?>`;
}

export function addPost(post) {
    const postElem = document.createElement('article');
    postElem.setAttribute('id', post.id);
    postElem.className = "col s12 m6 l4";
    postElem.innerHTML = `
      <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${post.imageUrl}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${post.title}<i class="material-icons right">more_vert</i></span>
        <p>Author: ${post.authorId}, Tags: ${post.tags ? post.tags.join(', ') : 'no tags'}</p>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${post.title}<i class="material-icons right">close</i></span>
        <p>${post.content}</p>
      </div>
      <div class="card-action">
        <button class="btn waves-effect waves-light" type="button" id="edit">Edit
          <i class="material-icons right">send</i>
        </button>
        <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete">Delete
          <i class="material-icons right">clear</i>
        </button>
      </div>
      </div>
      `;
    postsSection.insertAdjacentElement("beforeend", postElem);
    postElem.querySelector("#delete").addEventListener("click", (event) => deletePost(post.id));
    postElem.querySelector("#edit").addEventListener("click", (event) => editPost(post.id));
  }
  

async function handleSubmitPost(event) {
  try {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newPost = {};
    for (const entry of formData.entries()) {
      newPost[entry[0]] = entry[1];
    }
    if(post.id==0){
      editPostFromBlogs(post.id) ;
      addNewPost(post);

    }
    const tags = chipsInstances[0].chipsData.map((chips) => chips.tag);
    // console.log(tags);
    newPost["tags"] = tags;
    // console.log(newPost);
    const created = await addNewPost(newPost);
    addPost(created);
    resetform();
  } catch (err) {
    showError(err); 
  }
}

export function resetform() {
    addPostForm.reset();
    while (chipsInstances[0].chipsData.length > 0) {
      chipsInstances[0].deleteChip(0);
    }
}

async function deletePost(id) {
  try {
    deleteFromBlogs(id);
    document.getElementById(id).remove();
  } catch (err) {
    showError(err);
  }
}

// async function editPost(id){
//   try {
//     editPostFromBlogs(id);
//     document.getElementById(id).ed;
//   } catch(err) {
//     showError(err);
//   }
// }

export function editPost(post) {
  editPostFromBlogs(post);
  scrollTo(Headers);
  addPostForm.reset();
}

// window.addEventListener('click' , () => {
//   const form = document.querySelector("#new-task-from");
//   const input = document.querySelector("#new-task-input");
//   const list_el = document.querySelector("#tasks");

//   form.addEventListener('submit', (e) => {
//     e.preventDefault();
    
//     const task = input.value;

//     if (!task) {
//         alert("Please fill out the task");
//         return;
//     }

//     const task_el = document.createElement("div");
//     task_el.classList.add("task");
//   })
// })

init();

