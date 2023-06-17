import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
  PlusCircleOutlined,
  ShopOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import React from "react";
import "./App.css";
import logoIcon from "./assets/images/logo-icon.png";
import logo from "./assets/svg/logo.svg";

function App() {
  const [collapsed, setCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="layout-container">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}  
        style={{
          background: "#61A6AB",
        }}
      >
        <div className="demo-logo-vertical">
          {collapsed ? (
            <img
              style={{ width: "50px", height: "45px" }}
              src={logoIcon}
              alt="logo"
            ></img>
          ) : (
            <img style={{ width: "90%"}} src={logo} alt="logo"></img>
          )}
        </div>
        <Menu
          style={{
            background: "#61A6AB",
            color: "#FFFFFF"
          }}
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <ShopOutlined />,
              label: <Button style={{backgroundColor: "transparent", border: "none", color: "#FFFFFF"}} onClick={""}>Produtos</Button>,
            },
            {
              key: "2",
              icon: <PlusCircleOutlined />,
              label: <Button style={{backgroundColor: "transparent", border: "none", color: "#FFFFFF"}} onClick={""}>Cadastrar</Button>,
            },
            {
              key: "3",
              icon: <ShoppingCartOutlined />,
              label: <Button style={{backgroundColor: "transparent", border: "none", color: "#FFFFFF"}} onClick={""}>Carrinho</Button>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#ACCEC0',
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
        </Header>
        <Content
          style={{
            maxHeight: "100%",
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "white",
            overflow: "auto",
          }}
        >
          {/* <Routes /> */}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
