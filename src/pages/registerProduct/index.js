import React from "react";
import { io } from "socket.io-client";
import "./styles.css";

const socket = io("http://localhost:3333");

const RegisterProduct = () => {
  const [codigo, setCodigo] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [preco, setPreco] = React.useState("");

  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handlePrecoChange = (event) => {
    setPreco(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const product = {
      productCode: codigo,
      productName: nome,
      productPrice: preco,
    };

    socket.emit("createProduct", product);
  };

  return (
    <div style={{ height: "100%" }} className="register-container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="codigo">Código do produto:</label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              onChange={handleCodigoChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="nome">Nome do produto:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={handleNomeChange}
            />
          </div>
          <div className="input-group">
            <label htmlFor="preco">Preço do produto:</label>
            <input
              type="text"
              id="preco"
              value={preco}
              onChange={handlePrecoChange}
            />
          </div>
          <div className="register-button-box">
            <button className="register-button" type="submit">
              Cadastrar produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterProduct;
