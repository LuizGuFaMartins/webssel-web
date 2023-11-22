import { Modal } from "antd";
import axios from "axios";
import React from "react";
import env from "react-dotenv";
import { io } from "socket.io-client";
import ItemCard from "../../components/itemCard";
import "./styles.css";

function ShoppingCart() {
  const socket = React.useMemo(() => io(`${env.BASE_URL}`), []);

  const [itens, setItens] = React.useState([]);
  const [filteredItens, setFilteredItens] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [deleteId, setDeleteId] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [totalValue, setTotalValue] = React.useState(0);

  React.useEffect(() => {
    function receiveItens(prods) {
      setItens([...prods]);
      setFilteredItens([...prods]);
    }

    socket.emit("listItens", { clientId: localStorage.getItem("clientId") });
    socket.on("refreshItensList", (prods) => {
      receiveItens(prods);
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
    socket.emit("deleteItem", {
      productId: deleteId,
      clientId: localStorage.getItem("clientId"),
    });
    const filter = itens.filter((product) => product?.productId !== deleteId);
    setFilteredItens(filter);
  }

  React.useEffect(() => {
    let total = 0;
    itens.forEach((item) => {
      total = total + item.product.productPrice;
    });
    setTotalValue(total);
  }, [itens]);

  function onSearch(value) {
    setSearch(value);
    if (search !== "") {
      const filter = itens.filter(
        (item) =>
          item?.product?.productName
            .toLowerCase()
            .includes(value.toLowerCase()) || item.itemCode.includes(value)
      );
      setFilteredItens(filter);
    } else {
      setFilteredItens(itens);
    }
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    axios
      .get(
        `${env.BASE_URL}/orders/find-open-order/${localStorage.getItem(
          "clientId"
        )}`
      )
      .then((orders) => {
        axios
          .post(`${env.BASE_URL}/orders/finish-order`, {
            orderId: orders.data[0].orderId,
            orderTotalPrice: totalValue,
          })
          .then(() => {
            socket.emit("listItens", {
              clientId: localStorage.getItem("clientId"),
            });
          });
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      <div className="confirmation-card-container">
        <div className="confirmation-card">
          <p className="card-title">
            Valor total do pedido:{" "}
            <span style={{ color: "black", paddingLeft: 5 }}>
              R${totalValue}
            </span>
          </p>
          <button type="primary" onClick={showModal} className="btn-buy">
            Finalizar Pedido
          </button>
          <Modal
            title={null}
            open={isModalOpen}
            footer={null}
            className="shoppincart-modal"
            onCancel={handleCancel}
            bodyStyle={{
              width: "100%",
              borderRadius: 35,
              textAlign: "center",
              padding: 0,
            }}
          >
            <p className="modal-text">
              Tem certeza que deseja finalizar o pedido?
            </p>
            <p style={{ color: "#322d49", padding: 10 }}>
              Valor total:{" "}
              <span style={{ color: "black" }}>R${totalValue}</span>
            </p>
            <div className="buttons-box">
              <button onClick={handleCancel}>Cancelar</button>
              <button onClick={handleOk}>Finalizar</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
