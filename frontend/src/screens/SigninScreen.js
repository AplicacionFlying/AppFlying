import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signin } from "../actions/userActions";
import { validateEmail } from "../helpers";
//import { userDaltails } from "../actions/userActions";
function SigninScreen(props) {
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errors, setError] = useState(false);
  const [errorEmailVacio, setErrorEmailVacio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
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

    setError(validateData());

    if (!errors) {
      return;
    }
    if (errors) {
      dispatch(signin(email, password));
      // setTimeout(function () {
      //   dispatch(userDaltails());
      // }, 5000);
    }
  };

  const validateData = () => {
    setErrorEmailVacio("");
    setErrorPassword("");
    setErrorEmail("");
    //setErrorPassword("");
    let isValid = true;

    if (email === "") {
      setErrorEmailVacio("Debe ingresar los datos");
      isValid = false;
    }
    if (email !== "" && !validateEmail(email)) {
      setErrorEmail("Debes de ingresar un email válido.");
      isValid = false;
    }

    if (password === "") {
      setErrorPassword("Debe ingresar los datos");
      isValid = false;
    }

    // if (size(password) < 6) {
    //   setErrorPassword(
    //     "Debes ingresar una contraseña de al menos seis carácteres."
    //   );
    //   isValid = false;
    // }

    // if (size(formData.confirm) < 6) {
    //   setErrorConfirm(
    //     "Debes ingresar una confirmación de contraseña de al menos seis carácteres."
    //   );
    //   isValid = false;
    // }

    // if (formData.password !== formData.confirm) {
    //   setErrorPassword("La contraseña y la confirmación no son iguales.");
    //   setErrorConfirm("La contraseña y la confirmación no son iguales.");
    //   isValid = false;
    // }

    return isValid;
  };

  return (
    <div className="form">
      <form onSubmit={submitHandler}>
        <ul className="form-container">
          <li>
            <h2>Iniciar sesion</h2>
          </li>
          <li>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
          </li>
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
            {!errors ? <span>{errorEmailVacio}</span> : <span></span>}
          </li>
          <li>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}></input>
          </li>
          <li>{!errors ? <span>{errorPassword}</span> : <span></span>}</li>
          <li>
            <button type="submit" className="button primary">
              Aceptar
            </button>
          </li>
          <li>Nuevo en flying?</li>
          <li>
            <Link
              to={
                redirect === "/" ? "register" : "register?redirect=" + redirect
              }
              className="button secondary text-center">
              Crear una cuenta en flying
            </Link>
          </li>
        </ul>
      </form>
    </div>
  );
}
export default SigninScreen;
