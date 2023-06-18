import React from "react";
import "./styles.css";

const ProductCard = ({ product, setDeleteId }) => {
  function onDelete() {
    setDeleteId(product.productId);
  }

  return (
    <div className="card-body">
      <div className="form-group">
        <label>Código do produto:</label>
        <span>{product.productCode}</span>
      </div>
      <div className="form-group">
        <label>Produto:</label>
        <span>{product.productName}</span>
      </div>
      <div className="form-group">
        <label>Preço:</label>
        <span>{product.productPrice}</span>
      </div>
      <div className="buttons-box">
        <button onClick={onDelete}>Excluir</button>
        <button>Comprar</button>
      </div>
    </div>
  );
};

export default ProductCard;
