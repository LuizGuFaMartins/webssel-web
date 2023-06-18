import React from "react";
import ItemCard from "../../components/itemCard";
import "./styles.css";

function ShoppingCart() {
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
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Valor total do pedido:</h5>
            <div className="card-buttons">
              <button className="btn-buy">Finalizar Pedido</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
