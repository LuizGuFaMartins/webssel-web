import React, { useState } from "react";
import ItemCard from "../../components/itemCard";
import "./styles.css";
import { Button, Modal } from 'antd';

function ShoppingCart() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="container">
      <div className="search-bar">
        <input type="text" placeholder="Buscar por nome do produto..." />
        <div className="glass"></div>
      </div>
      <div className="boxcard">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
      <div className="confirmation-card">
        <div className="cardfinal">
          <div className="card-body">
            <h5 className="card-title">Valor total do pedido:</h5>
            <div className="card-buttons">
              <Button type="primary" onClick={showModal} className="btn-buy">
                Finalizar Pedido
              </Button>
              <Modal
                title="Tem certeza que deseja finalizar o pedido?"
                visible={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <p>Conteúdo do modal...</p>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
