import React from "react";

const ProductCard = () => {
  return(
    <div className="card">
      <div className="card-body">
        <div className="form-group">
          <label>Código do Item:</label>
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
        <div className="form-group">
          <label>Quantidade:</label>
          <span>ola pessoas</span>
        </div>
        <div className="form-group">
          <label>Valor total do item:</label>
          <span>ola pessoas</span>
        </div>
        <div className="remove-button">
          <button>Remover do carrinho</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
