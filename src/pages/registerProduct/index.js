import { Modal } from "antd";
import React from "react";
import uuid from "react-uuid";
import { io } from "socket.io-client";
import "./styles.css";

const RegisterProduct = () => {
  const socket = React.useMemo(() => io("http://localhost:3333"), []);
  const [codigo, setCodigo] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [preco, setPreco] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    setCodigo(uuid().split("-")[0]);
  }, []);

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

    setCodigo(uuid().split("-")[0]);
    setNome("");
    setPreco("");
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ height: "100%" }} className="register-container">
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <div className="product-input-group">
            <label htmlFor="codigo">Código do produto:</label>
            <input
              type="text"
              id="codigo"
              value={codigo}
              disabled={true}
              onChange={handleCodigoChange}
            />
          </div>
          <div className="product-input-group">
            <label htmlFor="nome">Nome do produto:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={handleNomeChange}
            />
          </div>
          <div className="product-input-group">
            <label htmlFor="preco">Preço do produto:</label>
            <input
              type="number"
              id="preco"
              value={preco}
              onChange={handlePrecoChange}
            />
          </div>
          <div className="register-button-box">
            <button type="primary" onClick={showModal} className="btn-buy">
              Cadastrar produto
            </button>
            <Modal
              title={null}
              open={isModalOpen}
              footer={null}
              className="register-product-modal"
              onOk={handleOk}
              onCancel={handleCancel}
              bodyStyle={{
                width: "100%",
                borderRadius: 35,
                textAlign: "center",
                padding: 0,
              }}
            >
              <p className="modal-text">
                Tem certeza que deseja remover esse item do carrinho?
              </p>
              <div className="buttons-box">
                <button onClick={handleCancel}>Cancelar</button>
                <button onOk={handleOk}>Remover</button>
              </div>
            </Modal>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterProduct;
