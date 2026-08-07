/**
 * These are the raw functions that actually perform fetch/axios.
 * They don't contain any React Query; they simply "talk" to the server and return the data.
 */
import type { IDiplomaItem } from "../types/diploma.t";
import type {
  IApiResponse,
  IPaginationApiResponse,
} from "../../../shared/types/api";

export async function getDiplomaListApi(params: URLSearchParams) {
  const response = await fetch("/api/diploma/list?" + params.toString());
  const payload: IApiResponse<IPaginationApiResponse<IDiplomaItem[]>> =
    await response.json();

  if (!payload.status) {
    throw new Error("Failed to fetch diploma list");
  }

  return payload;
}