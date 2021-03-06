import React, { isValidElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import {
  savePaquete,
  listPaquetes,
  deletePaquete,
} from "../actions/productActions";
//import { userDaltails } from "../actions/userActions";

function PlaceOrderScreen(props) {
  const cart = useSelector((state) => state.cart);
  const orderCreate = useSelector((state) => state.orderCreate);

  const { loading, success, error, order } = orderCreate;
  const user = useSelector((state) => state.userDetails);

  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.15 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const itenPut = cartItems.map((ite) => ite.product);
  const intItePut = itenPut[0];
  console.log("itenPut");
  console.log(intItePut);
  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    // create an order
    dispatch(
      createOrder({
        orderItems: cartItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      })
    );
    dispatch(
      savePaquete({
        _id: intItePut,
      })
    );
  };

  useEffect(() => {
    //dispatch(userDaltails());
    if (success) {
      props.history.push("/order/" + order._id);
    }
  }, [success]);
  console.log(user);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Datos personales</h3>
            <div>
              {cart.shipping.address}, {cart.shipping.city},
              {cart.shipping.postalCode}, {cart.shipping.country},
            </div>
            <div>
              {user.userDetails.name}, {user.userDetails.email}
            </div>
          </div>
          <div>
            <h3>Metodo de pago</h3>
            <div>Metodo de pago: {cart.payment.paymentMethod}</div>
          </div>
          <div>
            <ul className="cart-list-container">
              <li>
                <h3>Pasajes</h3>
                <div>Precio</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map((item) => (
                  <li>
                    <div className="cart-image">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="cart-name">
                      <div>
                        <Link to={"/product/" + item.product}>{item.name}</Link>
                      </div>
                      <div>Cantidad: {item.qty}</div>
                    </div>
                    <div className="cart-price">${item.price}</div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <button
                className="button primary full-width"
                onClick={placeOrderHandler}>
                Realizar compra
              </button>
            </li>
            <li>
              <h3>Resumen de la compra</h3>
            </li>
            <li>
              <div>Items</div>
              <div>${itemsPrice}</div>
            </li>

            <li>
              <div>Inpuestos</div>
              <div>${taxPrice}</div>
            </li>
            <li>
              <div>Pago Total</div>
              <div>${totalPrice}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
