import { useMutation } from "@tanstack/react-query";
import { sendEmailVerificationMutationOptions } from "../auth.option";

export const useSendEmailVerification = () => {
  return useMutation(sendEmailVerificationMutationOptions());
};