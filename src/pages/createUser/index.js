import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import { Modal } from "antd";

const RegisterClient = ({onCancel}) => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPassword, setClientPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);


  const handleClientNameChange = (event) => {
    setClientName(event.target.value);
  };

  const handleClientPasswordChange = (event) => {
    setClientPassword(event.target.value);
  };

  const handleClientEmailChange = (event) => {
    setClientEmail(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleGoBack = () => {
    onCancel();
  };

  const handleCloseErrorModal = () => {
    setErrorModalVisible(false);
  };

  const handleOk = () => {
    if (!clientName || !clientEmail || !clientPassword || !confirmPassword) {
      setErrorModalVisible(true);
      return;
    }

    if (clientPassword !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    setPasswordsMatch(true);

    axios
      .post(`http://localhost:3333/clients/cadastro`, {
        clientName: clientName,
        clientPassword: clientPassword,
        clientEmail: clientEmail,
      })
      .then(() => {
        console.log("Cliente cadastrado");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar o cliente:", error);
      });

    handleGoBack();
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Cadastro</h2>
        <div className="input-group">
          <label htmlFor="clientName" className="label-fixed-width">Nome:</label>
          <input
            type="text"
            id="clientName"
            value={clientName}
            onChange={handleClientNameChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="clientEmail" className="label-fixed-width">Email:</label>
          <input
            type="text"
            id="clientEmail"
            value={clientEmail}
            onChange={handleClientEmailChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="clientPassword" className="label-fixed-width">Senha:</label>
          <input
            type="password"
            id="clientPassword"
            value={clientPassword}
            onChange={handleClientPasswordChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword" className="label-fixed-width">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {!passwordsMatch && (
          <p style={{ color: "red" }}>As senhas não coincidem.</p>
        )}
        <div className="btn-div">
          <button className="btn" onClick={handleGoBack}>Voltar</button>
          <button className="btn" onClick={handleOk}>Cadastrar</button>
        </div>
        <Modal
          title="Campos vazios"
          visible={errorModalVisible}
          onOk={handleCloseErrorModal}
          onCancel={handleCloseErrorModal}
          centered
          footer={null}
        >
          <p>Preencha todos os campos por favor.</p>
          <div className="modal-buttons" style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={handleCloseErrorModal}>OK</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default RegisterClient;

