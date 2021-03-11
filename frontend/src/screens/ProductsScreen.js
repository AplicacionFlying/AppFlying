import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  savePaquete,
  listPaquetes,
  deletePaquete,
} from "../actions/productActions";

function ProductsScreen(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [paisOrigen, setOrigen] = useState("");
  const [horaOrigen, setHoraOrigen] = useState("");
  const [fechaOrigen, setFechaOrigen] = useState("");
  const [paisDestino, setDestino] = useState("");
  const [horaDestino, setHoraDestino] = useState("");
  const [fechaDestino, setFechaDestino] = useState("");
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
    setHoraOrigen(product.horaOrigen);
    setFechaOrigen(product.fechaOrigen);
    setDestino(product.paisDestino);
    setHoraDestino(product.horaDestino);
    setFechaDestino(product.fechaDestino);
    setCountInStock(product.countInStock);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      savePaquete({
        _id: id,
        name,
        price,
        image,
        paisOrigen,
        horaOrigen,
        fechaOrigen,
        paisDestino,
        horaDestino,
        fechaDestino,
        countInStock,
        description,
      })
    );
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
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Paquetes</h3>
        <button className="button primary" onClick={() => openModal({})}>
          Crear paquete
        </button>
      </div>
      {modalVisible && (
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
                <label htmlFor="name">Nombre del paquete</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  id="name"
                  onChange={(e) => setName(e.target.value)}></input>
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
                <label htmlFor="image">Imagen</label>
                <input
                  type="text"
                  name="image"
                  value={image}
                  id="image"
                  onChange={(e) => setImage(e.target.value)}></input>
                <input type="file" onChange={uploadFileHandler}></input>
                {uploading && <div>Uploading...</div>}
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
                <label htmlFor="horaOrigen">Hora de origen</label>
                <input
                  type="text"
                  name="horaOrigen"
                  value={horaOrigen}
                  id="horaOrigen"
                  onChange={(e) => setHoraOrigen(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor="fechaOrigen">Fecha de origen</label>
                <input
                  type="text"
                  name="fechaOrigen"
                  value={fechaOrigen}
                  id="fechaOrigen"
                  onChange={(e) => setFechaOrigen(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor="destino">Lugar de destino</label>
                <input
                  type="text"
                  name="destino"
                  value={paisDestino}
                  id="destino"
                  onChange={(e) => setDestino(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor="horaDestino">Hora de destino</label>
                <input
                  type="text"
                  name="horaDestino"
                  value={horaDestino}
                  id="horaDestino"
                  onChange={(e) => setHoraDestino(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor="fechaDestino">Fecha de destino</label>
                <input
                  type="text"
                  name="fechaDestino"
                  value={fechaDestino}
                  id="fechaDestino"
                  onChange={(e) => setFechaDestino(e.target.value)}></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  value={countInStock}
                  id="countInStock"
                  onChange={(e) => setCountInStock(e.target.value)}></input>
              </li>

              <li>
                <label htmlFor="description">Descripcion</label>
                <textarea
                  name="description"
                  value={description}
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}></textarea>
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
                <td>{paquete.horaOrigen}</td>
                <td>{paquete.fechaOrigen}</td>
                <td>{paquete.paisDestino}</td>
                <td>{paquete.horaDestino}</td>
                <td>{paquete.fechaDestino}</td>

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
