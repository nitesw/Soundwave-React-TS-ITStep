import { LoginFields, RegisterFields } from "../models/accounts";
import { tokenService } from "./token.service";
import createApiService from "./api.headers.service";

const API = import.meta.env.VITE_ACCOUNTS_API;
let api = createApiService(API);
export const accountsService = {
  getAll() {
    return api.get("all");
  },
  get(id: string) {
    return api.get("getUser/?id=" + id);
  },
  register(values: RegisterFields) {
    return api.post("register", values);
  },
  login(values: LoginFields) {
    return api.post("login", values);
  },
  logout() {
    tokenService.clear();
  },
  isAuthenticated(): boolean {
    return tokenService.get() !== null;
  },
  changeRole(userId: string, role: string) {
    return api.put(`changeRole?userId=${userId}&role=${role}`);
  },
};
