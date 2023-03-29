import React from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;
const contentStyle = {
  display: "flex",
  flexWrap: "wrap",
  padding: "3rem 3rem",
  justifyContent: "center",
};
const AOLayout = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">
            <Link to="/">Accueil</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/rooms">Chambres</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/about">A propos</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/contact">Contact</Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={contentStyle} children={children}></Content>
      <Footer style={{ textAlign: "center" }}>Super hôtel</Footer>
    </Layout>
  );
};

export default AOLayout;
