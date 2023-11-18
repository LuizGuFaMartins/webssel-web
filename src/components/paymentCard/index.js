import { Modal } from "antd";
import React, { useEffect } from "react";

import "./styles.css";

const PaymentCard = ({ payment, setDeleteId }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  let expired = false;

  useEffect(() => {
    const paymentCreatedAt = new Date(payment.paymentCreatedAt);
    const newDate = new Date(paymentCreatedAt);
    newDate.setHours(newDate.getHours() + 1);
    expired = new Date().getTime() > newDate.getTime();
  }, []);

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
        <label>
          Produto: <span className="span-label">{payment.paymentName}</span>
        </label>
      </div>
      <div className="form-group">
        <label>
          Preço: <span className="span-label">R${payment.paymentPrice}</span>
        </label>
      </div>
      <div className="form-group">
        <label>
          Pedido: <span className="span-label">{payment.orderId}</span>
        </label>
      </div>
      <div className="buttons-box">
        <button type="primary" onClick={showModal} className="btn-buy">
          Excluir
        </button>
        <Modal
          title={null}
          open={isModalOpen}
          footer={null}
          className="payment-modal"
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
        <button
          disabled={expired}
          type="primary"
          onClick={showBuyModal}
          className="btn-buy"
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default PaymentCard;
