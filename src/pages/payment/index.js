import React from "react";
import { io } from "socket.io-client";
import PaymentCard from "../../components/paymentCard";
import "./styles.css";

const Payments = () => {
  const socket = React.useMemo(() => io("http://localhost:3333"), []);

  const [payment, setPayments] = React.useState([]);
  const [filteredPayments, setFilteredPayments] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [deleteId, setDeleteId] = React.useState(0);

  React.useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected...");
    });

    function receivePayments(pay) {
      setPayments([...pay]);
      setFilteredPayments([...pay]);
    }
    socket.emit("listPayments", localStorage.getItem("clientId"));
    socket.on("refreshPaymentsList", (pay) => {
      console.log(pay)
      receivePayments(pay);
    });
  }, [socket]);

  React.useEffect(() => {
    if (deleteId !== 0) {
      deletePayment();
    } else {
      setDeleteId(0);
    }
  }, [deleteId]);

  async function deletePayment() {
    socket.emit("deletePayment", deleteId);
    const filter = payment.filter((payment) => payment.paymentId !== deleteId);
    setFilteredPayments(filter);
  }

  function onSearch(value) {
    setSearch(value);
    if (value != "") {
      const filter = payment.filter((pay) =>
        pay.orderId == value
      );
      setFilteredPayments(filter);
    } else {
      setFilteredPayments(payment);
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
        {filteredPayments.length > 0 &&
          filteredPayments.map((pay) => (
            <div key={pay.paymentId} className="product-card">
              <PaymentCard payment={pay} setDeleteId={setDeleteId} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Payments;
