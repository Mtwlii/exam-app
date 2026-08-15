import type { IUser } from "../../user/types/user";

export interface IRegisterValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface IRegisterResponse {
  user: IUser;
  token: string;
}

export interface ILoginValues {
  username: string;
  password: string;
}

export interface ILoginResponse {
  user: IUser;
  token: string;
}

export interface ISendEmailVerificationValues {
  email: string;
}

export interface ISendEmailVerificationResponse {
  message?: string;
}

export interface IConfirmEmailVerificationValues {
  email: string;
  code: string;
}

export interface IConfirmEmailVerificationResponse {
  message?: string;
}