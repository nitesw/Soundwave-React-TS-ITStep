import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
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
);
