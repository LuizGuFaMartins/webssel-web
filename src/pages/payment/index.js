import React from "react";
import env from "react-dotenv";
import { io } from "socket.io-client";
import PaymentCard from "../../components/paymentCard";
import "./styles.css";

const Payments = () => {
  const socket = React.useMemo(() => io(`${env.BASE_URL}`), []);

  const [payment, setPayments] = React.useState([]);
  const [filteredPayments, setFilteredPayments] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [deleteId, setDeleteId] = React.useState(0);

  React.useEffect(() => {
    function receivePayments(pay) {
      setPayments([...pay]);
      setFilteredPayments([...pay]);
    }

    socket.emit("listPayments", { clientId: localStorage.getItem("clientId") });
    socket.on("refreshPaymentsList", (pay) => {
      receivePayments(pay);
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
      deletePayment();
    } else {
      setDeleteId(0);
    }
  }, [deleteId]);

  async function deletePayment() {
    socket.emit("deletePayment", {
      paymentId: deleteId,
      clientId: localStorage.getItem("clientId"),
    });
    const filter = payment.filter((payment) => payment.paymentId !== deleteId);
    setFilteredPayments(filter);
  }

  function onSearch(value) {
    setSearch(value);
    if (value !== "") {
      const filter = payment.filter((pay) => pay.orderId === value);
      setFilteredPayments(filter);
    } else {
      setFilteredPayments(payment);
    }
  }

  return (
    <div className="payment-container">
      <div className="search-bar">
        <input
          value={search}
          onChange={({ target }) => onSearch(target.value)}
          type="text"
          placeholder="Buscar por nome do produto..."
        />
        <div className="glass"></div>
      </div>
      <div className="payment-boxcard">
        {filteredPayments.length > 0 &&
          filteredPayments.map((pay) => (
            <div key={pay.paymentId} className="payment-card">
              <PaymentCard payment={pay} setDeleteId={setDeleteId} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Payments;
