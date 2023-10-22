import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Modal } from "antd";
import "./styles.css";
import logoIcon from "../../assets/images/logo-icon.png";

const Login = () => {
  const socket = React.useMemo(() => io("http://localhost:3333"), []);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token.access_token);
        navigate("/produtos");
      } else {
        setErrorModalVisible(true);
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img src={logoIcon} alt="logo" />
      </div>
      <div className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
      </div>

      <Modal
        title="Credenciais inválidas"
        visible={errorModalVisible}
        onOk={handleCloseErrorModal}
        onCancel={handleCloseErrorModal}
        centered
        footer={null} 
      >
        <p>As credenciais fornecidas são inválidas. Por favor, tente novamente.</p>
        <div className="modal-buttons" style={{display: "flex", justifyContent: "center"}}>
          <button onClick={handleCloseErrorModal}>OK</button>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
