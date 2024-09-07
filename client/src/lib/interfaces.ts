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
