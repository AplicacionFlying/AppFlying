import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  savePaquete,
  listPaquetes,
  deletePaquete,
} from "../actions/productActions";

function ProductsScreen(props) {
  const [errorNameRequerido, setErrorNameRequerido] = useState("");
  const [errorpriceRequerido, setErrorPriceRequerido] = useState("");
  const [errorImagenRequerido, setErrorImagenRequerido] = useState("");
  const [errorPaisOrigenRequerido, setErrorPaisOrigenRequerido] = useState("");
  const [
    errorFechaOrigenIdaRequerido,
    setErrorFechaOrigenIdaRequerido,
  ] = useState("");
  const [
    errorHoraOrigenIdaRequerido,
    setErrorHoraOrigenIdaRequerido,
  ] = useState("");
  const [errorPaisDestinoRequerido, setErrorPaisDestinoRequerido] = useState(
    ""
  );
  const [
    errorFechaDestinoIdaRequerido,
    setErrorFechaDestinoIdaRequerido,
  ] = useState("");
  const [
    errorHoraDestinoIdaRequerido,
    setErrorHoraDestinoIdaRequerido,
  ] = useState("");
  const [
    errorHoraOrigenVueltaRequerido,
    setErrorHoraOrigenVueltaRequerido,
  ] = useState("");
  const [
    errorFechaOrigenVueltaRequerido,
    setErrorFechaOrigenVueltaRequerido,
  ] = useState("");
  const [
    errorHoraDestinoVueltaRequerido,
    setErrorHoraDestinoVueltaRequerido,
  ] = useState("");
  const [
    errorFechaDestinoVueltaRequerido,
    setErrorFechaDestinoVueltaRequerido,
  ] = useState("");
  const [errorCountInStockRequerido, setErrorCountInStockRequerido] = useState(
    ""
  );
  const [errorDescriptionRequerido, setErrorDescriptionRequerido] = useState(
    ""
  );
  const [errors, setErrors] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [paisOrigen, setOrigen] = useState("");
  const [horaOrigenIda, setHoraOrigenIda] = useState("");
  const [fechaOrigenIda, setFechaOrigenIda] = useState("");
  const [paisDestino, setDestino] = useState("");
  const [horaDestinoIda, setHoraDestinoIda] = useState("");
  const [fechaDestinoIda, setFechaDestinoIda] = useState("");
  const [horaOrigenVuelta, setHoraOrigenVuelta] = useState("");
  const [fechaOrigenVuelta, setFechaOrigenVuelta] = useState("");
  const [horaDestinoVuelta, setHoraDestinoVuelta] = useState("");
  const [fechaDestinoVuelta, setFechaDestinoVuelta] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const paqueteList = useSelector((state) => state.paqueteList);
  const { loading, paquetes, error } = paqueteList;

  const paqueteSave = useSelector((state) => state.paqueteSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave,
  } = paqueteSave;

  const paqueteDelete = useSelector((state) => state.paqueteDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = paqueteDelete;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listPaquetes());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = (product) => {
    setModalVisible(true);
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImage(product.image);
    setOrigen(product.paisOrigen);
    setHoraOrigenIda(product.horaOrigenIda);
    setFechaOrigenIda(product.fechaOrigenIda);
    setDestino(product.paisDestino);
    setHoraDestinoIda(product.horaDestinoIda);
    setFechaDestinoIda(product.fechaDestinoIda);
    setCountInStock(product.countInStock);
    setHoraOrigenVuelta(product.horaOrigenVuelta);
    setFechaOrigenVuelta(product.fechaOrigenVuelta);
    setHoraDestinoVuelta(product.horaDestinoVuelta);
    setFechaDestinoVuelta(product.fechaDestinoVuelta);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    setErrors(validateData());
    if (!errors) {
      return;
    }
    if (errors) {
      dispatch(
        savePaquete({
          _id: id,
          name,
          price,
          image,
          paisOrigen,
          horaOrigenIda,
          fechaOrigenIda,
          paisDestino,
          horaDestinoIda,
          fechaDestinoIda,
          countInStock,
          description,
          horaOrigenVuelta,
          fechaOrigenVuelta,
          horaDestinoVuelta,
          fechaDestinoVuelta,
        })
      );
    }
  };
  const deleteHandler = (paquete) => {
    dispatch(deletePaquete(paquete._id));
  };
  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setImage(response.data);
        setUploading(false);
      })
      .catch((err) => {
        console.log(err);
        setUploading(false);
      });
  };

  const validateData = () => {
    setErrorNameRequerido("");
    setErrorPriceRequerido("");
    setErrorImagenRequerido("");
    setErrorPaisOrigenRequerido("");
    setErrorHoraOrigenIdaRequerido("");
    setErrorFechaOrigenIdaRequerido("");
    setErrorPaisDestinoRequerido("");
    setErrorHoraDestinoIdaRequerido("");
    setErrorFechaDestinoIdaRequerido("");
    setErrorHoraOrigenVueltaRequerido("");
    setErrorFechaOrigenVueltaRequerido("");
    setErrorHoraDestinoVueltaRequerido("");
    setErrorFechaDestinoVueltaRequerido("");
    setErrorCountInStockRequerido("");
    setErrorDescriptionRequerido("");

    let isValid = true;
    if (name === "") {
      setErrorNameRequerido("Dato necesario *");
      isValid = false;
    }
    if (price === "") {
      setErrorPriceRequerido("Dato necesario *");
      isValid = false;
    }
    if (image === "") {
      setErrorImagenRequerido("Dato necesario *");
      isValid = false;
    }
    if (paisOrigen === "") {
      setErrorPaisOrigenRequerido("Dato necesario *");
      isValid = false;
    }
    if (horaOrigenIda === "") {
      setErrorHoraOrigenIdaRequerido("Dato necesario *");
      isValid = false;
    }
    if (fechaOrigenIda === "") {
      setErrorFechaOrigenIdaRequerido("Dato necesario *");
      isValid = false;
    }
    if (paisDestino === "") {
      setErrorPaisDestinoRequerido("Dato necesario *");
      isValid = false;
    }
    if (horaDestinoIda === "") {
      setErrorHoraDestinoIdaRequerido("Dato necesario *");
      isValid = false;
    }

    if (fechaDestinoIda === "") {
      setErrorFechaDestinoIdaRequerido("Dato necesario *");
      isValid = false;
    }
    if (horaOrigenVuelta === "") {
      setErrorHoraOrigenVueltaRequerido("Dato necesario *");
      isValid = false;
    }

    if (fechaOrigenVuelta === "") {
      setErrorFechaOrigenVueltaRequerido("Dato necesario *");
      isValid = false;
    }
    if (horaDestinoVuelta === "") {
      setErrorHoraDestinoVueltaRequerido("Dato necesario *");
      isValid = false;
    }
    if (fechaDestinoVuelta === "") {
      setErrorFechaDestinoVueltaRequerido("Dato necesario *");
      isValid = false;
    }
    if (countInStock === "") {
      setErrorCountInStockRequerido("Dato necesario *");
      isValid = false;
    }
    if (description === "") {
      setErrorDescriptionRequerido("Dato necesario *");
      isValid = false;
    }
    return isValid;
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3></h3>
        <button className="button primary" onClick={() => openModal({})}>
          Crear paquete
        </button>
      </div>
      {modalVisible && (
        <div className="form-product">
          <div className="form">
            <form onSubmit={submitHandler}>
              <ul className="form-container">
                <li>
                  <h2>Crear paquete de viaje</h2>
                </li>
                <li>
                  {loadingSave && <div>Loading...</div>}
                  {errorSave && <div>{errorSave}</div>}
                </li>

                <li>
                  <div className="colum-campos">
                    <div className="two-colums">
                      <div className="colum">
                        <li>
                          <label htmlFor="name">Nombre del paquete</label>
                          <input
                            type="text"
                            name="name"
                            value={name}
                            id="name"
                            onChange={(e) => setName(e.target.value)}></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorNameRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="price">Precio del paquete</label>
                          <input
                            type="text"
                            name="price"
                            value={price}
                            id="price"
                            onChange={(e) => setPrice(e.target.value)}></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorpriceRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="image">Imagen</label>
                          <input
                            disabled
                            type="text"
                            name="image"
                            value={image}
                            id="image"
                            onChange={(e) => setImage(e.target.value)}></input>
                          <input
                            type="file"
                            onChange={uploadFileHandler}></input>
                          {uploading && <div>Uploading...</div>}
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorImagenRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="origen">Lugar de origen</label>
                          <input
                            type="text"
                            name="origen"
                            value={paisOrigen}
                            id="origen"
                            onChange={(e) => setOrigen(e.target.value)}></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorPaisOrigenRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="horaOrigenIda">
                            Hora de origen de ida
                          </label>
                          <input
                            type="text"
                            name="horaOrigenIda"
                            value={horaOrigenIda}
                            id="horaOrigenIda"
                            onChange={(e) =>
                              setHoraOrigenIda(e.target.value)
                            }></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorHoraOrigenIdaRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="fechaOrigenIda">
                            Fecha de origen de ida
                          </label>
                          <input
                            type="text"
                            name="fechaOrigenIda"
                            value={fechaOrigenIda}
                            id="fechaOrigenIda"
                            onChange={(e) =>
                              setFechaOrigenIda(e.target.value)
                            }></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorFechaOrigenIdaRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="destino">Lugar de destino</label>
                          <input
                            type="text"
                            name="destino"
                            value={paisDestino}
                            id="destino"
                            onChange={(e) =>
                              setDestino(e.target.value)
                            }></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorPaisDestinoRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                      </div>
                    </div>

                    <div className="two-colums">
                      <div className="colum">
                        <li>
                          <label htmlFor="horaDestinoIda">
                            Hora de destino de ida
                          </label>
                          <input
                            type="text"
                            name="horaDestinoIda"
                            value={horaDestinoIda}
                            id="horaDestinoIda"
                            onChange={(e) =>
                              setHoraDestinoIda(e.target.value)
                            }></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorHoraDestinoIdaRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="fechaDestinoIda">
                            Fecha de destino de ida
                          </label>
                          <input
                            type="text"
                            name="fechaDestinoIda"
                            value={fechaDestinoIda}
                            id="fechaDestinoIda"
                            onChange={(e) =>
                              setFechaDestinoIda(e.target.value)
                            }></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorFechaDestinoIdaRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="countInStock">CountInStock</label>
                          <input
                            type="text"
                            name="countInStock"
                            value={countInStock}
                            id="countInStock"
                            onChange={(e) =>
                              setCountInStock(e.target.value)
                            }></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorCountInStockRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>

                        <li>
                          <label htmlFor="description">Descripcion</label>
                          <textarea
                            name="description"
                            value={description}
                            id="description"
                            onChange={(e) =>
                              setDescription(e.target.value)
                            }></textarea>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorDescriptionRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="horaOrigenVuelta">
                            Hora de origen de vuelta
                          </label>
                          <input
                            type="text"
                            name="horaOrigenVuelta"
                            value={horaOrigenVuelta}
                            id="horaOrigenVuelta"
                            onChange={(e) =>
                              setHoraOrigenVuelta(e.target.value)
                            }></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorHoraOrigenVueltaRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="fechaOrigenVuelta">
                            Fecha de origen de vuelta
                          </label>
                          <input
                            type="text"
                            name="fechaOrigenVuelta"
                            value={fechaOrigenVuelta}
                            id="fechaOrigenVuelta"
                            onChange={(e) =>
                              setFechaOrigenVuelta(e.target.value)
                            }></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorFechaOrigenVueltaRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="horaDestinoVuelta">
                            Hora de destino de vuelta
                          </label>
                          <input
                            type="text"
                            name="horaDestinoVuelta"
                            value={horaDestinoVuelta}
                            id="horaDestinoVuelta"
                            onChange={(e) =>
                              setHoraDestinoVuelta(e.target.value)
                            }></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorHoraDestinoVueltaRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li>
                          <label htmlFor="fechaDestinoVuelta">
                            Fecha de detino de vuelta
                          </label>
                          <input
                            type="text"
                            name="fechaDestinoVuelta"
                            value={fechaDestinoVuelta}
                            id="fechaDestinoVuelta"
                            onChange={(e) =>
                              setFechaDestinoVuelta(e.target.value)
                            }></input>
                        </li>
                        <li>
                          {!errors ? (
                            <span>{errorFechaDestinoVueltaRequerido}</span>
                          ) : (
                            <span></span>
                          )}
                        </li>
                        <li></li>
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <button type="submit" className="button primary">
                    {id ? "Update" : "Create"}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setModalVisible(false)}
                    className="button secondary">
                    Atras
                  </button>
                </li>
              </ul>
            </form>
          </div>
        </div>
      )}

      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Origen</th>
              <th>HoraOrigen</th>
              <th>FechaOrigen</th>
              <th>Destino</th>
              <th>HoraDestino</th>
              <th>FechaDestino</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paquetes.map((paquete) => (
              <tr key={paquete._id}>
                <td>{paquete._id}</td>
                <td>{paquete.name}</td>
                <td>{paquete.price}</td>
                <td>{paquete.paisOrigen}</td>
                <td>{paquete.horaOrigenIda}</td>
                <td>{paquete.fechaOrigenIda}</td>
                <td>{paquete.paisDestino}</td>
                <td>{paquete.horaDestinoVuelta}</td>
                <td>{paquete.fechaDestinoVuelta}</td>

                <td>
                  <button className="button" onClick={() => openModal(paquete)}>
                    Editar
                  </button>{" "}
                  <button
                    className="button"
                    onClick={() => deleteHandler(paquete)}>
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
export default ProductsScreen;
