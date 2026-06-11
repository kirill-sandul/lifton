export enum ApiKnownErrorResType {
  INVITE_ALREADY_EXISTS = 'INVITE_ALREADY_EXISTS',
}

export interface ApiErrorRes {
  type: ApiKnownErrorResType;
}
