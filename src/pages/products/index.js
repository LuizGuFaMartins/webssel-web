import React from "react";
import env from "react-dotenv";
import { io } from "socket.io-client";
import ProductCard from "../../components/productCard";
import "./styles.css";

const Product = () => {
  const socket = React.useMemo(() => io(`${env.BASE_URL}`), []);

  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [deleteId, setDeleteId] = React.useState(0);

  React.useEffect(() => {
    function receiveProducts(prods) {
      setProducts([...prods]);
      setFilteredProducts([...prods]);
    }

    socket.on("refreshProductsList", (prods) => {
      receiveProducts(prods);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  React.useEffect(() => {
    socket.connect();
  }, [socket]);

  React.useEffect(() => {
    if (deleteId !== 0) {
      deleteProduct();
    } else {
      setDeleteId(0);
    }
  }, [deleteId]);

  async function deleteProduct() {
    socket.emit("deleteProduct", deleteId);
    const filter = products.filter((product) => product.productId !== deleteId);
    setFilteredProducts(filter);
  }

  function onSearch(value) {
    setSearch(value);
    if (search !== "") {
      const filter = products.filter((product) =>
        product.productName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filter);
    } else {
      setFilteredProducts(products);
    }
  }

  return (
    <div className="product-container">
      <div className="search-bar">
        <input
          value={search}
          onChange={({ target }) => onSearch(target.value)}
          type="text"
          placeholder="Buscar por nome do produto..."
        />
        <div className="glass"></div>
      </div>
      <div className="product-boxcard">
        {filteredProducts.length > 0 &&
          filteredProducts.map((prod) => (
            <div key={prod.productCode} className="product-card">
              <ProductCard product={prod} setDeleteId={setDeleteId} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Product;
