import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import AuthContext from "../context/AuthContext";
import { PoweroffOutlined } from "@ant-design/icons";
import { Button } from "antd";
import axios from "axios";
const { Header, Content, Footer } = Layout;
const contentStyle = {
  display: "flex",
  flexWrap: "wrap",
  padding: "3rem 3rem",
  justifyContent: "center",
};

const AOLayout = ({ children }) => {
  const navigate = useNavigate();

  const { loggedIn } = useContext(AuthContext);
  const { getLoggedIn } = useContext(AuthContext);

  console.log("logged in : ", loggedIn);

  const logOut = async () => {
    await axios.get("/api/logout");
    getLoggedIn();

    navigate("/");
  };
  return (
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          {loggedIn === true && (
            <>
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
              <Menu.Item key="7">
                <Button
                  type="primary"
                  icon={<PoweroffOutlined />}
                  onClick={() => logOut(2)}
                />
              </Menu.Item>
            </>
          )}

          {loggedIn === false && (
            <>
              <Menu.Item key="5">
                <Link to="/inscription">Inscription</Link>
              </Menu.Item>
              <Menu.Item key="6">
                <Link to="/login">Connexion</Link>
              </Menu.Item>
            </>
          )}
        </Menu>
      </Header>

      <Content style={contentStyle} children={children}></Content>

      {loggedIn === true && (
        <>
          <Footer style={{ textAlign: "center" }}>Super hôtel</Footer>
        </>
      )}
    </Layout>
  );
};

export default AOLayout;
