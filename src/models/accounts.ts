export interface UserModel {
  id: string;
  userName: string;
  email: string;
  passwordHash: string;
  playlistCount?: number;
  trackCount?: number;
}
export type LoginFields = {
  userName?: string;
  password?: string;
};
export type RegisterFields = {
  userName?: string;
  email?: string;
  password?: string;
};
export interface TokenPayload {
  id: string;
  userName: string;
  email: string;
  role?: string;
}
export interface TokenPayloadItems {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}
