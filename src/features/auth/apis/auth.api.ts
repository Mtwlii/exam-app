import type { IApiResponse } from "../../../shared/types/api";
import type {
  IRegisterResponse,
  IRegisterValues,
  ILoginValues,
  ILoginResponse,
  ISendEmailVerificationValues,
  ISendEmailVerificationResponse,
  IConfirmEmailVerificationValues,
  IConfirmEmailVerificationResponse,
} from "../types/auth";

export async function registerApi(values: IRegisterValues) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data: IApiResponse<IRegisterResponse> = await response.json();

  return data;
}

export async function loginApi(values: ILoginValues) {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data: IApiResponse<ILoginResponse> = await response.json();
  return data;
}

export async function sendEmailVerificationApi(
  values: ISendEmailVerificationValues
) {
  const response = await fetch("/api/auth/send-email-verification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data: IApiResponse<ISendEmailVerificationResponse> =
    await response.json();
  return data;
}

export async function confirmEmailVerificationApi(
  values: IConfirmEmailVerificationValues
) {
  const response = await fetch("/api/auth/confirm-email-verification", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data: IApiResponse<IConfirmEmailVerificationResponse> =
    await response.json();
  return data;
}