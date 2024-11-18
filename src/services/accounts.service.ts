import axios from "axios";
import { LoginFields, RegisterFields } from "../models/accounts";
import { tokenService } from "./token.service";

const API = import.meta.env.VITE_ACCOUNTS_API;
let api = axios.create({ baseURL: API });
export const accountsService = {
  getAll() {
    return api.get("all");
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
};
