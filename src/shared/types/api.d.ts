export interface ISuccessfullApiResponse<T> {
  status: true;
  code: number;
  payload: T;
}

export interface IErrorApiResponse {
  status: false;
  code: number;
  message: string;
}

export type IApiResponse<T> = ISuccessfullApiResponse<T> | IErrorApiResponse;

export interface IPaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
export interface IPaginationApiResponse<T> {
  data: T;
  metadata: IPaginationMetadata;
}

