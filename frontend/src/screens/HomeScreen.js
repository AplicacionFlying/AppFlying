import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { listPaquetes } from "../actions/productActions";
import Rating from "../components/Rating";
import "bootstrap/dist/css/bootstrap.min.css";

function HomeScreen(props) {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const category = props.match.params.id ? props.match.params.id : "";
  const paqueteList = useSelector((state) => state.paqueteList);
  const { paquetes, loading, error } = paqueteList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listPaquetes());

    return () => {
      //
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(listProducts(category, searchKeyword, sortOrder));
  };
  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    // dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {category && <h2>{category}</h2>}

      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <input
              name="searchKeyword"
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <button type="submit">Buscar</button>
          </form>
        </li>
        <li>
          {" "}
          <select name="sortOrder" onChange={sortHandler}>
            <option value="">Mas nuevo</option>
            <option value="lowest">Mas bajo</option>
            <option value="highest">Mas alto</option>
          </select>
        </li>
      </ul>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul className="products">
          {paquetes.map((paquete) => (
            <li key={paquete._id}>
              <div className="product">
                <Link to={"/product/" + paquete._id}>
                  <img
                    className="product-image"
                    src={paquete.image}
                    alt="product"
                  />
                </Link>
                <div className="product-name">
                  <Link to={"/product/" + paquete._id}>{paquete.name}</Link>
                </div>
                <div className="product-brand">{paquete.description}</div>

                <div className="product-price">${paquete.price}</div>
                <div>
                  <span>Salida</span>
                </div>
                <div className="product-brand">{paquete.paisOrigen}</div>
                <div className="product-brand">{paquete.fechaOrigen}</div>
                <div className="product-brand">{paquete.horaOrigen}</div>
                <div>
                  <span>Llegada</span>
                </div>
                <div className="product-brand">{paquete.paisDestino}</div>
                <div className="product-brand">{paquete.fechaDestino}</div>
                <div className="product-brand">{paquete.horaDestino}</div>
                <div className="product-rating">
                  <Rating
                  // value={product.rating}
                  // text={product.numReviews + " reviews"}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
export default HomeScreen;
