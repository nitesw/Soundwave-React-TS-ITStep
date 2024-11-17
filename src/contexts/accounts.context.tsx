import React, { useContext } from "react";
import { TokenPayload } from "../models/accounts";
import { tokenService } from "../services/token.service";

export type AccountContextType = {
  account: TokenPayload | null;
  clear: () => void;
  setAccount: (payload: TokenPayload | null) => void;
};
export const AccountContext = React.createContext<AccountContextType | null>(
  null
);
export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [account, setAccount] = React.useState<TokenPayload | null>(
    tokenService.getPayload()
  );
  const clear = () => {
    setAccount(null);
  };
  return (
    <AccountContext.Provider value={{ account, setAccount, clear }}>
      {children}
    </AccountContext.Provider>
  );
};
// Custom hook to access the context
export const useAccountContext = (): AccountContextType => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext must be used within an AccountProvider");
  }
  return context;
};
