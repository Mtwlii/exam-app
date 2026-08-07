import type { IUser } from "../../user/types/user";

export interface IRegisterValues {
  name: string;
  email: string;
  password: string;
  phone: string;
  zip: string;
  country: string; 
}


export interface IRegisterResponse {
    token: string;
    user: IUser;
}