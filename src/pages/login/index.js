import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import "./styles.css";
import logoIcon from "../../assets/images/logo-icon.png";

const Login = () => {
  const navigate = useNavigate();

  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleNavigateToCadastro = () => {
    navigate("/cadastroCliente");
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientEmail, clientPassword }),
      });

      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token.access_token);
        const tokenTimestamp = new Date().getTime();
        localStorage.setItem("tokenTimestamp", tokenTimestamp);
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
          placeholder="Email"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={clientPassword}
          onChange={(e) => setClientPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Entrar</button>
        <p>
          Não tem uma conta? <span className="span" onClick={handleNavigateToCadastro}>Cadastrar</span>
        </p>
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
