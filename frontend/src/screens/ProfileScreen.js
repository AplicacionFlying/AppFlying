import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { logout, update } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail, validarPassword } from "../helpers";
import { push } from "docker-compose";

function ProfileScreen(props) {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorEmailRequerido, setErrorEmailRequerido] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordRequerido, setErrorPasswordRequerido] = useState("");
  const [errorPasswordComfir, setErrorPasswordComfir] = useState("");
  const [errorNameRequerido, setErrorNameRequerido] = useState("");
  const [errors, setErrors] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [rePassword, setRePassword] = useState("");
  const dispatch = useDispatch();

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setErrors(validateData());

    if (!errors) {
      return;
    }
    if (errors) {
      dispatch(update({ userId: userInfo._id, email, name, password }));
      //props.history.push("http://localhost:3000");
    }
  };
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name);
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {};
  }, [userInfo]);

  const validateData = () => {
    setErrorNameRequerido("");
    setErrorEmailRequerido("");
    setErrorEmail("");
    setErrorPasswordRequerido("");
    setErrorPassword("");
    setErrorPasswordComfir("");

    //setErrorPassword("");
    let isValid = true;
    if (name === "") {
      setErrorNameRequerido("Debe ingresar un nombre");
      isValid = false;
    }
    if (email === "") {
      setErrorEmailRequerido("Debe ingresar un email");
      isValid = false;
    }
    if (email !== "" && !validateEmail(email)) {
      setErrorEmail("Debes de ingresar un email válido.");
      isValid = false;
    }

    if (password === "") {
      setErrorPasswordRequerido("Debe ingresar los datos");
      isValid = false;
    }
    if (password !== "" && !validarPassword(password))
      if (rePassword === "") {
        setErrorPasswordRequerido("La contraseña debe tener minimo 4 digitos");
        isValid = false;
      }
    if (password !== rePassword) {
      setErrorPasswordComfir("La contraseña y la confirmación no son iguales.");
      isValid = false;
    }
    return isValid;
  };

  return (
    <div className="profile">
      <div className="profile-info">
        <div className="form">
          <form onSubmit={submitHandler}>
            <ul className="form-container">
              <li>
                <h2>Perfil de usuario</h2>
              </li>
              <li>
                {loading && <div>Loading...</div>}
                {error && <div>{error}</div>}
                {success && <div>Profile Saved Successfully.</div>}
              </li>
              <li>
                <label htmlFor="name">Nombre</label>
                <input
                  value={name}
                  type="name"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}></input>
              </li>
              <li>
                {!errors ? <span>{errorNameRequerido}</span> : <span></span>}
              </li>
              <li>
                <label htmlFor="email">Email</label>
                <input
                  value={email}
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}></input>
              </li>
              <li>
                {!errors ? <span>{errorEmail}</span> : <span></span>}
                {!errors ? <span>{errorEmailRequerido}</span> : <span></span>}
              </li>
              <li>
                <label htmlFor="password">Contraseña</label>
                <input
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}></input>
              </li>
              <li>
                {!errors ? (
                  <span>{errorPasswordRequerido}</span>
                ) : (
                  <span></span>
                )}
                {!errors ? <span>{errorPassword}</span> : <span></span>}
              </li>
              <li>
                <label htmlFor="rePassword">Repetir contraseña</label>
                <input
                  type="password"
                  id="rePassword"
                  name="rePassword"
                  onChange={(e) => setRePassword(e.target.value)}></input>
              </li>
              <li>
                {!errors ? (
                  <span>{errorPasswordRequerido}</span>
                ) : (
                  <span></span>
                )}
                {!errors ? <span>{errorPasswordComfir}</span> : <span></span>}
              </li>

              <li>
                <button type="submit" className="button primary">
                  Editar
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="button secondary full-width">
                  Cerrar sesion
                </button>
              </li>
            </ul>
          </form>
        </div>
      </div>
      <div className="profile-orders content-margined">
        {loadingOrders ? (
          <div>Loading...</div>
        ) : errorOrders ? (
          <div>{errorOrders} </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>FECHA</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.totalPrice}</td>
                  <td>{order.isPaid}</td>
                  <td>
                    <Link to={"/order/" + order._id}>DETALLES</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ProfileScreen;
