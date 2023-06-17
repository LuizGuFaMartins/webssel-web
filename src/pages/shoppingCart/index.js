import React from "react";
import ItemCard from "../../components/itemCard";
import "./styles.css";

function ShoppingCart() {
  return (
    <div className="container">
      <div className="search-bar">
        <input type="text" placeholder="Buscar por nome do produto..." />
      </div>
      <div className="boxcard">
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
    </div>
  );
}

export default ShoppingCart;
