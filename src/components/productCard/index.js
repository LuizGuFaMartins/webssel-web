import axios from "axios";
import React from "react";
import "./styles.css";

const ProductCard = ({ product }) => {
  async function deleteProduct() {
    await axios.delete(`http://localhost:3333/products/${product.productId}`);
  }

  return (
    <div className="card">
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
          <button onClick={deleteProduct}>Excluir</button>
          <button>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
