import { Modal } from "antd";
import React, { useState } from "react";
import env from "react-dotenv";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/images/bg2.jpg";
import logoIcon from "../../assets/images/logo-icon.png";
import RegisterClient from "../createUser";
import "./stylesLogin.css";
const Login = () => {
  const navigate = useNavigate();

  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  const handleNavigateToCadastro = () => {
    setRegisterModalVisible(true);
  };

  const handleCloseRegisterModal = () => {
    setRegisterModalVisible(false);
  };

  const [registerModalVisible, setRegisterModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch(`${env.BASE_URL}/auth/login`, {
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
        localStorage.setItem("clientId", token.clientId);
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
    <div className="div-tela">
      <div className="div-left">
        <img className="img-bg" src={bg}></img>
      </div>

      <div className="div-right">
        <div className="login-c">
          <div className="div-direita">
            <div className="logo">
              <img src={logoIcon} alt="logo" />
            </div>
            <div className="login-formulario">
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
              <button className="botao-entrar" onClick={handleLogin}>
                Entrar
              </button>
              <p>
                Não tem uma conta?{" "}
                <span className="span" onClick={handleNavigateToCadastro}>
                  Cadastrar
                </span>
              </p>
            </div>

            <Modal
              title="Credenciais inválidas"
              open={errorModalVisible}
              onOk={handleCloseErrorModal}
              onCancel={handleCloseErrorModal}
              centered
              footer={null}
            >
              <p>
                As credenciais fornecidas são inválidas. Por favor, tente
                novamente.
              </p>
              <div
                className="modal-buttons"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <button onClick={handleCloseErrorModal}>OK</button>
              </div>
            </Modal>

            <Modal
              className="modal-cad"
              open={registerModalVisible}
              onOk={handleCloseRegisterModal}
              onCancel={handleCloseRegisterModal}
              centered
              footer={null}
            >
              <RegisterClient onCancel={handleCloseRegisterModal} />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
