import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsPaquete, saveProductReview } from "../actions/productActions";
import Rating from "../components/Rating";
import { PRODUCT_REVIEW_SAVE_RESET } from "../constants/productConstants";

function ProductScreen(props) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const paqueteDetails = useSelector((state) => state.paqueteDetails);
  const { paquete, loading, error } = paqueteDetails;
  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;
  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert("Review submitted successfully.");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsPaquete(props.match.params.id));
    return () => {
      //
    };
  }, [productSaveSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch actions
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating: rating,
        comment: comment,
      })
    );
  };
  const handleAddToCart = () => {
    props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
  };

  return (
    <div>
      <div className="back-to-result">
        <Link to="/">Volver atras</Link>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error} </div>
      ) : (
        <>
          <div className="details">
            <div className="details-image">
              <img src={paquete.image} alt="product"></img>
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <h4>Paquete de viaje a {paquete.name}</h4>
                </li>
                <li>
                  <a href="#reviews">
                    <Rating
                    // value={product.rating}
                    // text={product.numReviews + " reviews"}
                    />
                  </a>
                </li>
                <li>
                  Precio: <b>${paquete.price}</b>
                </li>
                <div className="two-columns">
                  <div className="colum">
                    <li>
                      <b>Vuelo ida</b>
                    </li>
                    <li>
                      Pais de salida :<div>{paquete.paisOrigen}</div>
                    </li>
                    <li>
                      Fecha de salida:
                      <div>{paquete.fechaOrigenIda}</div>
                    </li>
                    <li>
                      Hora de salida:
                      <div>{paquete.horaOrigenIda}</div>
                    </li>
                    <li>
                      Pais de destino:
                      <div>{paquete.paisDestino}</div>
                    </li>
                    <li>
                      Fecha de llegada:
                      <div>{paquete.fechaDestinoIda}</div>
                    </li>
                    <li>
                      Hora de llegada:
                      <div>{paquete.horaDestinoIda}</div>
                    </li>
                  </div>
                  <div className="colum">
                    <li>
                      <b>Vuelo vuelta</b>
                    </li>
                    <li>
                      Pais de salida :<div>{paquete.paisDestino}</div>
                    </li>
                    <li>
                      Fecha de salida:
                      <div>{paquete.fechaOrigenVuelta}</div>
                    </li>
                    <li>
                      Hora de salida:
                      <div>{paquete.horaOrigenVuelta}</div>
                    </li>
                    <li>
                      Pais de destino:
                      <div>{paquete.paisDestino}</div>
                    </li>
                    <li>
                      Fecha de llegada:
                      <div>{paquete.fechaDestinoVuelta}</div>
                    </li>
                    <li>
                      Hora de llegada:
                      <div>{paquete.horaDestinoVuelta}</div>
                    </li>
                  </div>
                </div>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>Precio: {paquete.price}</li>
                <li>
                  Status:{" "}
                  {paquete.countInStock > 0 ? "In Stock" : "Unavailable."}
                </li>
                <li>
                  Cantidad:{" "}
                  <select
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value);
                    }}>
                    {[...Array(paquete.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
                <li>
                  {paquete.countInStock > 0 && (
                    <button
                      onClick={handleAddToCart}
                      className="button primary">
                      Agregar pasajes
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <h2>Reviews</h2>
            {!paquete.reviews.length && <div>There is no review</div>}
            <ul className="review" id="reviews">
              {paquete.reviews.map((review) => (
                <li key={review._id}>
                  <div>{review.name}</div>
                  <div>
                    <Rating value={review.rating}></Rating>
                  </div>
                  <div>{review.createdAt.substring(0, 10)}</div>
                  <div>{review.comment}</div>
                </li>
              ))}
              <li>
                <h3>Write a customer review</h3>
                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <ul className="form-container">
                      <li>
                        <label htmlFor="rating">Rating</label>
                        <select
                          name="rating"
                          id="rating"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}>
                          <option value="1">1- Poor</option>
                          <option value="2">2- Fair</option>
                          <option value="3">3- Good</option>
                          <option value="4">4- Very Good</option>
                          <option value="5">5- Excelent</option>
                        </select>
                      </li>
                      <li>
                        <label htmlFor="comment">Comment</label>
                        <textarea
                          name="comment"
                          value={comment}
                          onChange={(e) =>
                            setComment(e.target.value)
                          }></textarea>
                      </li>
                      <li>
                        <button type="submit" className="button primary">
                          Submit
                        </button>
                      </li>
                    </ul>
                  </form>
                ) : (
                  <div>
                    Please <Link to="/signin">Sign-in</Link> to write a review.
                  </div>
                )}
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
export default ProductScreen;
