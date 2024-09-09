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

export interface UserType {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
}

export interface ProfileUserType {
  user: UserType;
  country: string;
  id: string;
  city: string | null;
  zip_code: string | null;
  street: string | null;
  house_number: string | null;
  profile_picture: string | null;
}

// {
//   client    |   user: {
//   client    |     email: 'user@user.de',
//   client    |     username: 'testuser',
//   client    |     first_name: 'Test',
//   client    |     last_name: 'User'
//   client    |   },
//   client    |   country: '',
//   client    |   id: '477742e8-ccb0-456d-9ba3-c0dba00c2f49',
//   client    |   city: null,
//   client    |   zip_code: null,
//   client    |   street: null,
//   client    |   house_number: null,
//   client    |   profile_picture: null
//   client    | }
