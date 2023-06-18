import React from "react";
import { io } from "socket.io-client";
import ProductCard from "../../components/productCard";
import "./styles.css";

const socket = io("http://localhost:3333");

const Product = () => {
  const onSearch = (value) => console.log(value);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    setProducts([]);
    function receiveProducts(prods) {
      setProducts([...prods]);
    }

    socket.on("refreshProductsList", (prods) => {
      receiveProducts(prods);
    });
  }, []);

  return (
    <div className="container">
      <div className="search-bar">
        <input type="text" placeholder="Buscar por nome do produto..." />
        <div className="glass"></div>
      </div>
      <div className="boxcard">
        {products.map((prod) => (
          <div key={prod.productId}>
            <ProductCard product={prod} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
