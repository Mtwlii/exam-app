import {
  registerApi,
  loginApi,
  sendEmailVerificationApi,
  confirmEmailVerificationApi,
} from "./auth.api";

/**
 * src/features/auth/apis/auth.option.ts
 */

export const registerMutationOptions = () => {
  return {
    mutationFn: registerApi,
  } as const;
};

export const loginMutationOptions = () => {
  return {
    mutationFn: loginApi,
  } as const;
};

export const sendEmailVerificationMutationOptions = () => {
  return {
    mutationFn: sendEmailVerificationApi,
  } as const;
};

export const confirmEmailVerificationMutationOptions = () => {
  return {
    mutationFn: confirmEmailVerificationApi,
  } as const;
};