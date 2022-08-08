import { Post } from "./posts.js";
import { ValidationConfig, Validators, FormState } from "./validate.js";

export interface AppState {
  editedPost: Post | undefined;
  allPosts: Post[];
  postFormValidationConfig: ValidationConfig<Post>;
  postFormErrors: string[];
  postFormState: FormState<Post>;
}

export const AppStateStore: AppState = {
  editedPost: undefined,
  allPosts: [],
  postFormValidationConfig: {
    title: [
      Validators.required(),
      Validators.pattern(/^[A-Z a-z]{5}/),
      Validators.len(5, 15),
    ],
    authorId: [
      Validators.required(),
      Validators.pattern(/^[0-9]{1}/),
      Validators.len(3, 6),
    ],
    content: [
      Validators.required(),
      Validators.pattern(/^[A-Z a-z]{5}/),
      Validators.len(10, 25),
    ],
    imageUrl: [
      Validators.required(),
      Validators.pattern(/^(ftp|http|https):\/\/[^ "]+$/)
    ],
    tags: [
      Validators.required(),
      Validators.pattern(/^[a-zA-Z]+([,\s]+[a-zA-Z]+)+/)
    ],
  },
  postFormErrors: [],
  postFormState: {},
};
