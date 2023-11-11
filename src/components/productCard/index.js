import { Modal } from "antd";
import React from "react";
import uuid from "react-uuid";
import minus from "../../assets/svg/minus.svg";
import plus from "../../assets/svg/plus.svg";

import { io } from "socket.io-client";
import "./styles.css";

const ProductCard = ({ product, setDeleteId }) => {
  const socket = React.useMemo(() => io("http://localhost:3333"), []);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);

  function onDelete() {
    setDeleteId(product.productId);
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    onDelete();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showBuyModal = () => {
    setQuantity(1);
    setIsBuyModalOpen(true);
  };

  const handleOkBuy = () => {
    const item = {
      itemCode: uuid().split("-")[0],
      productId: product.productId,
      itemQuantity: quantity,
      clientId: 1,
      product: product,
    };

    socket.emit("createItem", item);
    setIsBuyModalOpen(false);
  };

  const handleCancelBuy = () => {
    setIsBuyModalOpen(false);
  };

  return (
    <div className="card-body">
      <div className="form-group">
        <label>Código do produto:</label>
        <span>{product.productCode}</span>
      </div>
      <div className="form-group">
        <label>Produto: <span className="span-label">{product.productName}</span></label>
        
      </div>
      <div className="form-group">
        <label>Preço: <span className="span-label">R${product.productPrice}</span></label>
        
      </div>
      <div className="buttons-box">
        <button type="primary" onClick={showModal} className="btn-buy">
          Excluir
        </button>
        <Modal
          title={null}
          open={isModalOpen}
          footer={null}
          className="product-modal"
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
            Tem certeza que deseja remover esse produto?
          </p>
          <span className="modal-warning">
            Aviso: se um produto for excluído, qualquer item associado a ele
            também será excluído.
          </span>
          <div style={{ marginTop: 20 }} className="buttons-box">
            <button onClick={handleCancel}>Cancelar</button>
            <button onClick={handleOk}>Excluir</button>
          </div>
        </Modal>
        <button type="primary" onClick={showBuyModal} className="btn-buy">
          Comprar
        </button>
        <Modal
          title={null}
          open={isBuyModalOpen}
          footer={null}
          className="product-modal"
          onOk={handleOkBuy}
          onCancel={handleCancelBuy}
          bodyStyle={{
            width: "100%",
            borderRadius: 35,
            textAlign: "center",
            padding: 0,
          }}
        >
          <p className="modal-text">Selecione a quantidade:</p>
          <div className="product-input-group">
            <img
              style={{ width: "50px", height: "45px" }}
              src={minus}
              alt="logo"
              onClick={() => {
                setQuantity((prev) => prev - 1);
              }}
            ></img>
            <input
              type="number"
              value={quantity}
              onChange={({ target }) => setQuantity(target.value)}
            />
            <img
              style={{ width: "50px", height: "45px" }}
              src={plus}
              alt="logo"
              onClick={() => {
                setQuantity((prev) => prev + 1);
              }}
            ></img>
          </div>
          <div style={{ marginTop: 20 }} className="buttons-box">
            <button onClick={handleCancelBuy}>Cancelar</button>
            <button
              style={{ backgroundColor: "#D3CB09" }}
              onClick={handleOkBuy}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProductCard;
