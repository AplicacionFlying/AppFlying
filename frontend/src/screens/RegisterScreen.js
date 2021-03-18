import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import { validateEmail, validarPassword } from "../helpers";

function RegisterScreen(props) {
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorEmailRequerido, setErrorEmailRequerido] = useState("");
  const [errorPasswordRequerido, setErrorPasswordRequerido] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorPasswordComfir, setErrorPasswordComfir] = useState("");
  const [errors, setErrors] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors(validateData());

    if (!errors) {
      return;
    }
    if (errors) {
      dispatch(register(name, email, password));
    }
  };

  const validateData = () => {
    setErrorName("");
    setErrorEmailRequerido("");
    setErrorEmail("");
    setErrorPasswordRequerido("");
    setErrorPassword("");
    setErrorPasswordComfir("");

    //setErrorPassword("");
    let isValid = true;
    if (name === "") {
      setErrorName("Debe ingresar un nombre");
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
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Crear cuenta</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
          <li>
            <label htmlFor="name">Nombre</label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={(e) => setName(e.target.value)}></input>
          </li>
          <li>{!errors ? <span>{errorName}</span> : <span></span>}</li>
          <li>
            <label htmlFor="email">Email</label>
            <input
              type="text"
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
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}></input>
          </li>
          <li>
            {!errors ? <span>{errorPasswordRequerido}</span> : <span></span>}
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
            {!errors ? <span>{errorPasswordRequerido}</span> : <span></span>}
            {!errors ? <span>{errorPasswordComfir}</span> : <span></span>}
          </li>
          <li>
            <button type="submit" className="button primary">
              Registrar
            </button>
          </li>
          {/* <li>
            Ya tienes una cuenta?
            <Link
              to={redirect === "/" ? "signin" : "signin?redirect=" + redirect}
              className="button secondary text-center">
              Crear la cuenta
            </Link>
          </li> */}
        </ul>
      </form>
    </div>
  );
}
export default RegisterScreen;
