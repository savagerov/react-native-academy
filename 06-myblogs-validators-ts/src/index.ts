import { ValidationConfig, ValidationResult, FormFieldState, ValidStatus, ChangedStatus } from './validate.js';
import { AppStateStore } from './state-store.js';
import { UsersAPI } from './blogs-api-client.js';
import { User } from './users.js';
import { FormFieldDict, IdType } from './shared-types.js';


// interface BlogControllerType {
//   usersSection: HTMLElement;
//   erorrsDiv: HTMLElement;
//   adduserForm: HTMLFormElement;
//   resetButton: HTMLButtonElement;
//   init(): Promise<void>;
// }


class BlogsController {
  usersSection = document.getElementById("users")!;
  erorrsDiv = document.getElementById("errors")!;
  protected adduserForm = document.getElementById("add-user-form")! as HTMLFormElement;
  resetButton = document.getElementById("form-reset-button")! as HTMLButtonElement;

  async init() {
    this.adduserForm.addEventListener('submit', this.handleSubmituser);
    this.adduserForm.addEventListener('change', this.validateForm, true);

    try {
      const allUsers = await UsersAPI.getAllUsers();
      AppStateStore.allUsers = allUsers;
      this.showusers(allUsers);
    } catch (err) {
      this.showError(err);
    }

    this.initFormState(this.adduserForm);
  }

  initFormState(formElement: HTMLFormElement) {
    const formData = new FormData(formElement);
    const np: FormFieldDict<FormFieldState> = {};
    formData.forEach((value, key) => {
      np[key] = new FormFieldState(ValidStatus.INVALID, ChangedStatus.PRISTINE);
    })
  }

  showusers(users: User[]) {
    users.forEach(user => this.adduserDOM(user));
  }

  showError(err: any) {
    if(!err) {
      this.erorrsDiv.innerHTML = ''
    } else {
      this.erorrsDiv.innerHTML = `<div>${err}</div>`;
    }
  }

  adduserDOM(user: User) {
    const userElem = document.createElement('article');
    userElem.setAttribute('id', user.id!.toString());
    userElem.className = "col s12 m6 l4";
    this.updateArticleInnerHtml(userElem, user);
    this.usersSection.insertAdjacentElement("beforeend", userElem);
  }

  updateuserDOM(user: User) {
    const userElem = document.getElementById(user.id!.toString())!;
    this.updateArticleInnerHtml(userElem, user);
  }

  private updateArticleInnerHtml(userElem: HTMLElement, user: User) {
    userElem.innerHTML = `
      <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${user.pictureUrl}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${user.firstName}<i class="material-icons right" >more_vert</i></span>
        <p>Author: ${user.authorId}, Tags: ${user.tags ? user.tags.join(', ') : 'no tags'}</p>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${user.lastName}<i class="material-icons right" >more_vert</i></span>
        <p>Author: ${user.authorId}, Tags: ${user.tags ? user.tags.join(', ') : 'no tags'}</p>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${user.username}<i class="material-icons right" >more_vert</i></span>
        <p>Author: ${user.authorId}, Tags: ${user.tags ? user.tags.join(', ') : 'no tags'}</p>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${user.password}<i class="material-icons right" >more_vert</i></span>
        <p>Author: ${user.authorId}, Tags: ${user.tags ? user.tags.join(', ') : 'no tags'}</p>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${user.gender}<i class="material-icons right" >more_vert</i></span>
        <p>Author: ${user.authorId}, Tags: ${user.tags ? user.tags.join(', ') : 'no tags'}</p>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${user.pictureUrl}<i class="material-icons right" >more_vert</i></span>
        <p>Author: ${user.authorId}, Tags: ${user.tags ? user.tags.join(', ') : 'no tags'}</p>
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${user.shortDescription}<i class="material-icons right" >more_vert</i></span>
        <p>Author: ${user.authorId}, Tags: ${user.tags ? user.tags.join(', ') : 'no tags'}</p>
      </div>
      <div class="card-action">
        <button class="btn waves-effect waves-light" type="button" id="edit${user.id}">Edit
          <i class="material-icons right">send</i>
        </button>
        <button class="btn waves-effect waves-light red lighten-1" type="button" id="delete${user.id}">Delete
          <i class="material-icons right">clear</i>
        </button>
      </div>
      </div>
      `;
    userElem.querySelector(`#delete${user.id}`)!.addEventListener('click', event => this.deleteuser(user.id!))
    userElem.querySelector(`#edit${user.id}`)!.addEventListener('click', event => this.editUser(user))
  }

  editUser(user: User) {
    this.fillUserForm(user);
    window.scrollTo(0, 0);
    AppStateStore.editedUser = user;
  }

  fillUserForm(user: User) {
    let field: keyof User;
    for (field in user) {
      (document.getElementById(field) as HTMLFormElement).value = user[field];
      const label = document.querySelector(`#add-user-form label[for=${field}]`);
      if (label) {
        label.className = 'active';
      }
    }
  }

  handleSubmituser = async (event: SubmitEvent) => {
    try {
      event.preventDefault();
      const user = this.getUserFormSnapshot();
      // const user = newuser as unknown as user;
      if (user.id) {
        const updated = await UsersAPI.updateUser(user);
        this.updateuserDOM(updated);
        AppStateStore.editedUser = undefined;
      } else {
        const created = await UsersAPI.addNewUser(user);
        this.adduserDOM(created);
      }
      this.resetForm();
    } catch (err) {
      this.showError(err);
    }
  }

  getUserFormSnapshot(): User{
    const user = 
    const formData = new FormData(this.adduserForm);
    const np: FormFieldDict<string> = {};
    formData.forEach((value, key) => {
      np[key] = value.toString();
    })
    return new user(np.title, np.content, np.tags.split(/\W+/), np.imageUrl, np.authorId ? parseInt(np.authorId): undefined , parseInt(np.id));
  }

  resetForm = () => {
    if (AppStateStore.editedUser) {
      this.fillUserForm(AppStateStore.editedUser);
    } else {
      this.adduserForm.reset();
    }
  }

  async deleteuser(userId: IdType) {
    try {
      await UsersAPI.deleteUserById(userId);
      document.getElementById(userId!.toString())?.remove();
    } catch (err) {
      this.showError(err);
    }
  }

  validateForm = (event: Event) => {
    const validationResult: ValidationResult<User> = {};
    const config = AppStateStore.UserFormValidationConfig;
    const formSnapshot = this.getUserFormSnapshot();
    let field: keyof ValidationConfig<User>;
    for (field in config) {
      const validator = config[field];
      if(validator !== undefined) {
        try{
          if(Array.isArray(validator)) {
            for(const correct of validator) {
              try {
                correct(formSnapshot[field]!.toString(), field);
              } catch(err){
                if(validationResult[field] === undefined) {
                  validationResult[field] = [] as Array<string>;
                }
                validationResult[field]!.push(err as string);
              }
            }
          }
          else {
            validator(formSnapshot[field]!.toString(), field);
          }
        } catch(err) {
          validationResult[field] = [err as string];
        }
      }
    }
    this.showValidationErrors(validationResult);
  }

  showValidationErrors(validationResult: ValidationResult<User>) {
    AppStateStore.UserFormErrors = [];
    let field: keyof ValidationResult<User>;
    for (field in validationResult) {
      const filedErrors = validationResult[field];
      if (filedErrors !== undefined) {
        for (const err of filedErrors) {
          AppStateStore.UserFormErrors.push(`${field} -> ${err}<br>`);
        }
      }
    }
    this.showError(AppStateStore.UserFormErrors.join(''));
  }
// random ID
//   ID = function () {
//     const numberId = [];
//     while (numberId.length < 1) {
//       const r = Math.floor(Math.random() * 10000) + 1;
//       if (numberId.indexOf(r) === -1) {
//         numberId.push(r);
//       }
//     }
//     console.log("Personal Id: " + numberId);
//   };
}

const blogsController = new BlogsController();


blogsController.init();