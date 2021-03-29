import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listOrders, deleteOrder } from "../actions/orderActions";
import Cookie from "js-cookie";
function OrdersScreen(props) {
  const orderList = useSelector((state) => state.orderList);
  const { loading, orders, error } = orderList;
  Cookie.set("orders", JSON.stringify(orders));
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = orderDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  };
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="content content-margined">
      <div className="order-header">
        <h3>Paquetes comprados</h3>
      </div>
      <div className="order-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}</td>
                <td>{order.user.name}</td>

                <td>
                  <Link to={"/order/" + order._id} className="button secondary">
                    Detalle
                  </Link>{" "}
                  <button
                    type="button"
                    onClick={() => deleteHandler(order)}
                    className="button secondary">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default OrdersScreen;
