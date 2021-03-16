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
        <ul className="paquetes">
          {paquetes.map((paquete) => (
            <li key={paquete._id}>
              <div className="paquete">
                <Link to={"/product/" + paquete._id}>
                  <img
                    className="paquete-image"
                    src={paquete.image}
                    alt="product"
                  />
                </Link>
                <div className="paquete-name">
                  <Link to={"/product/" + paquete._id}>
                    Argentina a {paquete.name}
                  </Link>
                </div>

                <div className="paquete-brand">{paquete.description}</div>

                <div className="paquete-price">${paquete.price}</div>
                <div className="two-columns">
                  <div className="colum">
                    <div className="paquete-name-colum">Ida</div>
                    <div>
                      <span>Salida</span>
                    </div>
                    <div className="paquete-brand">{paquete.paisOrigen}</div>
                    <div className="paquete-brand">
                      {paquete.fechaOrigenIda}
                    </div>
                    <div className="paquete-brand">{paquete.horaOrigenIda}</div>
                    <div>
                      <span>Llegada</span>
                    </div>
                    <div className="paquete-brand">{paquete.paisDestino}</div>
                    <div className="paquete-brand">
                      {paquete.fechaDestinoIda}
                    </div>
                    <div className="paquete-brand">
                      {paquete.horaDestinoIda}
                    </div>
                    <div className="paquete-rating">
                      <Rating
                      // value={product.rating}
                      // text={product.numReviews + " reviews"}
                      />
                    </div>
                  </div>
                  <div className="colum">
                    <div className="paquete-name-colum">Vuelta</div>
                    <div>
                      <span>Salida</span>
                    </div>
                    <div className="paquete-brand">{paquete.paisDestino}</div>
                    <div className="paquete-brand">
                      {paquete.fechaOrigenVuelta}
                    </div>
                    <div className="paquete-brand">
                      {paquete.horaOrigenVuelta}
                    </div>
                    <div>
                      <span>Llegada</span>
                    </div>
                    <div className="paquete-brand">{paquete.paisOrigen}</div>
                    <div className="paquete-brand">
                      {paquete.fechaDestinoVuelta}
                    </div>
                    <div className="paquete-brand">
                      {paquete.horaDestinoVuelta}
                    </div>
                    <div className="paquete-rating">
                      <Rating
                      // value={product.rating}
                      // text={product.numReviews + " reviews"}
                      />
                    </div>
                  </div>
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
