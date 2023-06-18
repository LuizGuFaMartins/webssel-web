import React from "react";
import ProductCard from "../../components/producCard";
import "./styles.css";

const Product = () => {
  const onSearch = (value) => console.log(value);
  
  return (
    <div className="container">
      <div className="search-bar">
        <input type="text" placeholder="Buscar por nome do produto..." />
        <div className="glass"></div>
      </div>
      <div className="boxcard">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default Product;
