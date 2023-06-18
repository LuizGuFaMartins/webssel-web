import React from "react";
import { io } from "socket.io-client";
import ItemCard from "../../components/itemCard";
import "./styles.css";

function ShoppingCart() {
  const socket = React.useMemo(() => io("http://localhost:3333"), []);

  const [itens, setItens] = React.useState([]);
  const [filteredItens, setFilteredItens] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [deleteId, setDeleteId] = React.useState(0);

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected...");
    });

    function receiveProducts(prods) {
      setItens([...prods]);
      setFilteredItens([...prods]);
    }

    socket.on("refreshItensList", (prods) => {
      receiveProducts(prods);
    });
  }, [socket]);

  React.useEffect(() => {
    if (deleteId !== 0) {
      deleteProduct();
    } else {
      setDeleteId(0);
    }
  }, [deleteId]);

  async function deleteProduct() {
    socket.emit("deleteItem", deleteId);
    const filter = itens.filter((product) => product.productId !== deleteId);
    setFilteredItens(filter);
  }

  function onSearch(value) {
    setSearch(value);
    if (search !== "") {
      const filter = itens.filter(
        (item) =>
          item.product.productName
            .toLowerCase()
            .includes(value.toLowerCase()) || item.itemCode.includes(value)
      );
      setFilteredItens(filter);
    } else {
      setFilteredItens(itens);
    }
  }

  return (
    <div className="container">
      <div className="search-bar">
        <input
          value={search}
          onChange={({ target }) => onSearch(target.value)}
          type="text"
          placeholder="Buscar por nome do produto ou código do item..."
        />
        <div className="glass"></div>
      </div>
      <div className="boxcard">
        {filteredItens.length > 0 &&
          filteredItens.map((item) => (
            <div key={item.itemCode} className="card">
              <ItemCard item={item} setDeleteId={setDeleteId} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default ShoppingCart;
