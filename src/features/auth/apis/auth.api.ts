//--------------------------------Mutation keys for react query--------------------------------

import type { IApiResponse } from "../../../shared/types/api";
import type { IRegisterResponse, IRegisterValues } from "../types/auth";


export async function registerApi(values: IRegisterValues) {
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data:IApiResponse<IRegisterResponse> = await response.json();
//   if (data.status) {
//    data.payload.token
//   }
  return data;
}
