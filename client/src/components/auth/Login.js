import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
function Login() {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { getLoggedIn } = useContext(AuthContext);

  const onFinish = async (e) => {
    try {
      const loginData = { email, password };

      await axios
        .post(`/api/login`, loginData)
        .then((_) => {
          api["success"]({
            message: "Vous êtes connecté",
          });
          getLoggedIn();
          navigate("/");
        })
        .catch((error) => {
          api["error"]({
            message: error.response.data.errorMessage,
          });
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {contextHolder}
      <h1>Connexion</h1>

      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item label="Email" name="Email">
          <Input onChange={(e) => setEmail(e.target.value)} value={email} />
        </Form.Item>

        <Form.Item
          label="Mot de passe"
          name="password"
          rules={[
            {
              required: true,
              message: "Champ obligatoire",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
