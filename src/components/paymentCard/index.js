import { Modal } from "antd";
import React from "react";
import uuid from "react-uuid";
import minus from "../../assets/svg/minus.svg";
import plus from "../../assets/svg/plus.svg";

import { io } from "socket.io-client";
import "./styles.css";

const PaymentCard = ({ payment, setDeleteId }) => {
  const socket = React.useMemo(() => io("http://localhost:3333"), []);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);

  function onDelete() {
    setDeleteId(payment.paymentId);
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
    window.open(payment.paymentQrCode);
  };

  return (
    <div className="card-body">
      <div className="form-group">
        <label>Código do produto:</label>
        <span>{payment.paymentId}</span>
      </div>
      <div className="form-group">
        <label>Produto: <span className="span-label">{payment.paymentName}</span></label>
      </div>
      <div className="form-group">
        <label>Preço: <span className="span-label">R${payment.paymentPrice}</span></label>
      </div>
      <div className="form-group">
        <label>Pedido: <span className="span-label">{payment.orderId}</span></label>
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
            Tem certeza que deseja remover esse pagamento?
          </p>
          <span className="modal-warning">
            Aviso: se um pagamento for excluído, não será possivel 
          </span>
          <div style={{ marginTop: 20 }} className="buttons-box">
            <button onClick={handleCancel}>Cancelar</button>
            <button onClick={handleOk}>Excluir</button>
          </div>
        </Modal>
        <button type="primary" onClick={showBuyModal} className="btn-buy">
          Pagar
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
