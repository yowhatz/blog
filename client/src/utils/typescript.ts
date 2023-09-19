export interface AuthStateUserData {
  username: string;
  password: string;
  cf_password?: string;
}

export interface UpdateProfileStateData {
  username: string;
  email: string;
  website: string;
  story: string;
}
