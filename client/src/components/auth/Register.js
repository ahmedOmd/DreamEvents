import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, Form, Input, notification } from "antd";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const { getLoggedIn } = useContext(AuthContext);

  const submit = async (e) => {
    try {
      const registerData = { email, password, passwordVerify };

      await axios
        .post(`/api/users`, registerData)
        .then((_) => {
          api["success"]({
            message: "Nouveau compte ajouté avec succés",
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
      <h1>Créer un nouveau compte utilisateur</h1>

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
        onFinish={submit}
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
          label="Verifier le mot de passe"
          name="passwordVerify"
          rules={[
            {
              required: true,
              message: "Champ obligatoire",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => setPasswordVerify(e.target.value)}
            value={passwordVerify}
          />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Inscription
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Register;
