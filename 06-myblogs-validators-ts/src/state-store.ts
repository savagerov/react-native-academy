import { User } from "./users.js";
import { ValidationConfig, Validators, FormState } from "./validate.js";

export interface AppState {
  editedUser: User | undefined;
  allUsers: User[];
  UserFormValidationConfig: ValidationConfig<User>;
  UserFormErrors: string[];
  UserFormState: FormState<User>;
}

export const AppStateStore: AppState = {
  editedUser: undefined,
  allUsers: [],
  UserFormValidationConfig: {
    // authorId: [
    //   Validators.required(),
    //   Validators.pattern(/^[0-9]{1}/),
    //   Validators.len(3, 6),
    // ],
    firstName: [Validators.required(),Validators.pattern(/^[A-Z a-z]/),Validators.len(2,15)],
    username: [Validators.required(),Validators.pattern(/^[A-Z a-z]/),Validators.len(2,15)],
    password: [Validators.required(),Validators.pattern(/^[A-Z a-z]/),Validators.len(2,15)],
    // pictureUrl[Validators.required(),Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)],
    lastName: [Validators.required(),Validators.pattern(/^[A-Z a-z]/),Validators.len(2,15)],
    shortDescription: [Validators.required(),Validators.pattern(/^[A-Z a-z]{5}/),Validators.len(10, 25),],
    id: [Validators.required(),Validators.pattern(/^[0-9]/),Validators.len(2,15)]
  },
  UserFormErrors: [],
  UserFormState: {},
};
