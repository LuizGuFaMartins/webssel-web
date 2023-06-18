import React from "react";
import "./styles.css";

const ItemCard = ({ item, setDeleteId }) => {
  function onDelete() {
    setDeleteId(item.itemId);
  }

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
        <button onClick={onDelete}>Remover do carrinho</button>
      </div>
    </div>
  );
};

export default ItemCard;
