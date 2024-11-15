import React, { useState } from "react";
import {
  CustomerServiceOutlined,
  HomeOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  StarOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const items = [
  {
    key: "/",
    label: "Home",
    icon: (
      <Link to="/" draggable="false">
        <HomeOutlined />
      </Link>
    ),
  },
  {
    key: "/music",
    label: "Music",
    icon: (
      <Link to="/music" draggable="false">
        <CustomerServiceOutlined />
      </Link>
    ),
  },
  {
    key: "/playlists",
    label: "Playlists",
    icon: (
      <Link to="/playlists" draggable="false">
        <MenuOutlined />
      </Link>
    ),
  },
  {
    key: "/users",
    label: "Users",
    icon: (
      <Link to="/users" draggable="false">
        <UserOutlined />
      </Link>
    ),
  },
  {
    key: "/favourites",
    label: "Favourites",
    icon: (
      <Link to="/favourites" draggable="false">
        <StarOutlined />
      </Link>
    ),
  },
];

const AppLayout: React.FC = () => {
  const location = useLocation();
  const [current] = useState(() => {
    return location.pathname.startsWith("/music")
      ? "/music"
      : location.pathname.startsWith("/playlists")
      ? "/playlists"
      : location.pathname;
  });

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="AppLayout">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#210028" }}
      >
        <Menu
          style={{ padding: 0, background: "#210028" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[current]}
          items={items}
        />
      </Sider>
      <Layout className="main">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div>
            <Link to="/register">
              <Button
                type="text"
                icon={<UserAddOutlined />}
                style={{
                  fontSize: "16px",
                  height: 64,
                }}
              >
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button
                type="text"
                icon={<LoginOutlined />}
                style={{
                  fontSize: "16px",
                  height: 64,
                }}
              >
                Login
              </Button>
            </Link>
          </div>
        </Header>
        <Content
          className="Content"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center", background: colorBgContainer }}>
          Soundwave ©{new Date().getFullYear()} Created using Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
