import React, { useState } from "react";
import {
  CustomerServiceOutlined,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  StarOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, message, theme } from "antd";
import { Footer } from "antd/es/layout/layout";
import { Link, Outlet, useLocation } from "react-router-dom";
import { accountsService } from "../services/accounts.service";
import { useAppSelector } from "../redux/hooks";
import {
  clear,
  selectAccount,
  selectIsAuth,
} from "../redux/account/accountSlice";
import { useDispatch } from "react-redux";
//import ReactPlayer from "react-player";

const { Header, Sider, Content } = Layout;

const AppLayout: React.FC = () => {
  const account = useAppSelector(selectAccount);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useDispatch();
  let items = null;
  const accountRole = account?.role;
  if (isAuth) {
    console.log(accountRole);
    if (accountRole === "admin") {
      items = [
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
    } else if (accountRole === "pro") {
      items = [
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
          key: "/favourites",
          label: "Favourites",
          icon: (
            <Link to="/favourites" draggable="false">
              <StarOutlined />
            </Link>
          ),
        },
      ];
    } else {
      items = [
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
          key: "/favourites",
          label: "Favourites",
          icon: (
            <Link to="/favourites" draggable="false">
              <StarOutlined />
            </Link>
          ),
        },
      ];
    }
  } else {
    items = [
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
        key: "/favourites",
        label: "Favourites",
        icon: (
          <Link to="/favourites" draggable="false">
            <StarOutlined />
          </Link>
        ),
      },
    ];
  }

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

  const logout = () => {
    accountsService.logout();
    dispatch(clear());
    message.success("Successfully logged out!");
  };

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
          {isAuth ? (
            <div>
              <Link to="/profile">
                <Button
                  type="text"
                  icon={<UserOutlined />}
                  style={{
                    fontSize: "16px",
                    height: 64,
                  }}
                >
                  Profile
                </Button>
              </Link>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                style={{
                  fontSize: "16px",
                  height: 64,
                }}
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
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
          )}
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
        <Footer style={{ background: colorBgContainer, textAlign: "center" }}>
          Soundwave ©{new Date().getFullYear()} Created using Ant UED
        </Footer>
        {/* <div>
          <ReactPlayer
            style={{ backgroundColor: "transparent" }}
            url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            playing={false}
            controls={true}
            width="100%"
            height="50px"
          />
        </div> */}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
