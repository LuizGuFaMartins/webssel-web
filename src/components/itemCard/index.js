import React from "react";
import "./styles.css";
import { Button, Modal } from "antd";

const ItemCard = ({ item, setDeleteId }) => {
const [isModalOpen, setIsModalOpen] = React.useState(false);

  function onDelete() {
    setDeleteId(item.itemId);
  }
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(item.itemId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card-body">
      <div className="form-group">
        <label>Código do Item:</label>
        <span>{item.itemCode}</span>
      </div>
      <div className="form-group">
        <label>Produto:</label>
        <span>{item.product.productName}</span>
      </div>
      <div className="form-group">
        <label>Preço:</label>
        <span>R${item.product.productPrice}</span>
      </div>
      <div className="form-group">
        <label>Quantidade:</label>
        <span>{item.itemQuantity}</span>
      </div>
      <div className="form-group">
        <label>Valor total do item:</label>
        <span>R${item.itemQuantity * item.product.productPrice}</span>
      </div>
      <div className="remove-button">
      <Button className="remo-button" onClick={showModal} type="submit">
            ALERTA
        </Button>
          <Modal
            title="ALERTA"
            visible={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <p>Tem certeza que deseja remover o produto do carinho?</p>
        </Modal>
      </div>
    </div>
  );
};

export default ItemCard;
