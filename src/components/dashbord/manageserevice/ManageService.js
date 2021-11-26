import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../../useHooks/useAuth";
import OrderBox from "../myorder/OrderBox";
// import useAuth from "../../../useHooks/useAuth";
// import OrderBox from "../../myorder/OrderBox";
// import OrderBox from "../myorder/OrderBox";
const ManageService = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    fetch(`https://arcane-river-87047.herokuapp.com/allorder`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        // console.log(data);
      });
  }, [user.email]);
  const deleteItem = (id) => {
    // console.log(id);
    const opinion = window.confirm(
      "hey ,do you want to delete this user confirmation??"
    );
    if (opinion) {
      axios
        .delete(`https://arcane-river-87047.herokuapp.com/deleteorder/${id}`)
        .then((res) => {
          if (res.data.deletedCount) {
            const restOrder = orders.filter((item) => item._id !== id);
            setOrders(restOrder);
          }
        });
    }
  };
  const statusChange = (id, order) => {
    // console.log(state);
    if (order.state === "pending") {
      axios
        .put(`https://arcane-river-87047.herokuapp.com/updatestate/${id}`, {
          state: "Approved",
        })
        .then((res) => {
          if (res.data.modifiedCount) {
            console.log(res.data);
            order.state = "Approved";
            const modified = orders.map((item) =>
              item._id === id ? order : item
            );
            setOrders(modified);
          }
        });
    }
  };
  return (
    <div className="container-fluid" style={{ minHeight: "68vh" }}>
      <div className="row">
        <div className="col-md-11 col-11 mx-auto ">
          <h1 className="text-center">Manage Orders</h1>
          <hr className="w-50 mx-auto" />
        </div>
        <div className="col-md-11 col-11 mx-auto ">
          {orders.map((order) => (
            <OrderBox
              key={order.key}
              order={order}
              deleteItem={deleteItem}
              status={1}
              statusChange={statusChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageService;
