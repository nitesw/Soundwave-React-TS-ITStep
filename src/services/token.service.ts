import { jwtDecode } from "jwt-decode";
import { TokenPayload, TokenPayloadItems } from "../models/accounts";

const accessTokenKey = "access-token";

export const tokenService = {
  save(accessToken: string) {
    localStorage.setItem(accessTokenKey, accessToken);
  },
  get(): string | null {
    return localStorage.getItem(accessTokenKey);
  },
  clear() {
    localStorage.removeItem(accessTokenKey);
  },
  getPayload(): TokenPayload | null {
    const token = this.get();
    if (token === null) return null;

    try {
      const payload = jwtDecode<TokenPayloadItems>(token);

      return {
        id: payload[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ],
        userName:
          payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
        email:
          payload[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
          ],
      };
    } catch (Error) {
      return null;
    }
  },
};
