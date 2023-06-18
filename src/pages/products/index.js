import React from "react";
import { io } from "socket.io-client";
import ProductCard from "../../components/productCard";
import "./styles.css";

const socket = io("http://localhost:3333");

const Product = () => {
  const onSearch = (value) => console.log(value);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    // socket.on("connect", () => {
    // });
    listProducts();
    function receiveProducts(prods) {
      setProducts([...prods]);
    }

    socket.on("refreshProductsList", (prods) => {
      receiveProducts(prods);
    });
  }, [socket]);

  function listProducts() {
    socket.emit("listProducts");
  }

  return (
    <div className="product-container">
      <div className="search-bar">
        <input type="text" placeholder="Buscar por nome do produto..." />
        <div className="glass"></div>
      </div>
      <div className="product-boxcard">
        {products.map((prod) => (
          <ProductCard product={prod} />
        ))}
      </div>
    </div>
  );
};

export default Product;
