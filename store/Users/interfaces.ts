export interface UsersInitialState {
  name: string;
  email: string;
  profileImage: string;
  role: string;
}

export interface UserInfo {
  id?: string;
  name: string;
  email: string;
  profileImage?: string;
  role: string;
}
