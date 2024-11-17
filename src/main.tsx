import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import { AccountProvider } from "./contexts/accounts.context.tsx";

createRoot(document.getElementById("root")!).render(
  <AccountProvider>
    <StrictMode>
      <BrowserRouter>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#a526cc",
              borderRadius: 6,
            },
          }}
        >
          <App />
        </ConfigProvider>
      </BrowserRouter>
    </StrictMode>
  </AccountProvider>
);
