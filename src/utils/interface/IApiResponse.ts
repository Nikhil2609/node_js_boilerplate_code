export interface APIResponse {
  data?: any;
  meta?: IMetaTokenResponse | IMetaPaginationResponse;
  message?: string;
  error?: string | Error;
}

export interface IMetaTokenResponse {
  token?: string;
}

export interface IMetaPaginationResponse {
  currentPage: number;
  totalRows: number;
  totalPages: number;
}
