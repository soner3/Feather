import { FieldError, UseFormRegister } from "react-hook-form";
import { string } from "zod";

export interface Username {
  username: string;
}

export interface PostsDataType {
  count: number;
  next: string;
  previous: string;
  results: Array<PostType>;
}

export interface PostType {
  id: string;
  message: string;
  profile: ProfileType;
}

export interface ProfileType {
  user: Username;
  profile_picture: string;
}

export interface UserDoesNotExist {
  non_field_errors: Array<string>;
  detail: string;
}

export interface RegisterFormFieldError {
  username: Array<string>;
  email: Array<string>;
  first_name: Array<string>;
  last_name: Array<string>;
  password: Array<string>;
}

export interface InputComponentType {
  inputType: string;
  inputId: string;
  labelValue: string;
  plcaeholder: string;
  error: FieldError | undefined | string;
  errorMessage: string | undefined;
  register: UseFormRegister<any>;
  registerSchema: string;
  required: boolean;
}

export interface TMailSchema {
  email: string;
}

export interface PasswordResetServerError {
  new_password: Array<string>;
}
