import React from "react";
import "./styles.css";

const ProductCard = () => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="form-group">
          <label>Código do produto:</label>
          <span>ola</span>
        </div>
        <div className="form-group">
          <label>Produto:</label>
          <span>ola pessoas</span>
        </div>
        <div className="form-group">
          <label>Preço:</label>
          <span>ola pessoas</span>
        </div>
        <div className="buttons-box">
          <button>Excluir</button>
          <button>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
