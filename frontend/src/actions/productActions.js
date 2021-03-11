import {
  PAQUETE_LIST_REQUEST,
  PAQUETE_LIST_SUCCESS,
  PAQUETE_LIST_FAIL,
  PAQUETE_DETAILS_REQUEST,
  PAQUETE_DETAILS_SUCCESS,
  PAQUETE_DETAILS_FAIL,
  PAQUETE_SAVE_REQUEST,
  PAQUETE_SAVE_SUCCESS,
  PAQUETE_SAVE_FAIL,
  PAQUETE_DELETE_REQUEST,
  PAQUETE_DELETE_SUCCESS,
  PAQUETE_DELETE_FAIL,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_SUCCESS,
} from "../constants/productConstants";
import axios from "axios";
import Axios from "axios";

const listPaquetes = () => async (dispatch) => {
  try {
    dispatch({ type: PAQUETE_LIST_REQUEST });
    const { data } = await axios.get("/api/paquete");
    dispatch({ type: PAQUETE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PAQUETE_LIST_FAIL, payload: error.message });
  }
};

// const listProducts = (
//   category = "",
//   searchKeyword = "",
//   sortOrder = ""
// ) => async (dispatch) => {
//   try {
//     dispatch({ type: PRODUCT_LIST_REQUEST });
//     const { data } = await axios.get(
//       "/api/products?category=" +
//         category +
//         "&searchKeyword=" +
//         searchKeyword +
//         "&sortOrder=" +
//         sortOrder
//     );
//     dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
//   }
// };

const savePaquete = (paquete) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAQUETE_SAVE_REQUEST, payload: paquete });
    const {
      userSignin: { userInfo },
    } = getState();
    if (!paquete._id) {
      const { data } = await Axios.post("/api/paquete", paquete, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: PAQUETE_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await Axios.put("/api/paquete/" + paquete._id, paquete, {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      });
      dispatch({ type: PAQUETE_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PAQUETE_SAVE_FAIL, payload: error.message });
  }
};

const detailsPaquete = (paqueteId) => async (dispatch) => {
  try {
    dispatch({ type: PAQUETE_DETAILS_REQUEST, payload: paqueteId });
    const { data } = await axios.get("/api/paquete/" + paqueteId);
    dispatch({ type: PAQUETE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PAQUETE_DETAILS_FAIL, payload: error.message });
  }
};

const deletePaquete = (paqueteId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    dispatch({ type: PAQUETE_DELETE_REQUEST, payload: paqueteId });
    const { data } = await axios.delete("/api/paquete/" + paqueteId, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: PAQUETE_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PAQUETE_DELETE_FAIL, payload: error.message });
  }
};

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  try {
    const {
      userSignin: {
        userInfo: { token },
      },
    } = getState();
    dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
    const { data } = await axios.post(
      `/api/products/${productId}/reviews`,
      review,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data });
  } catch (error) {
    // report error
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message });
  }
};

export {
  listPaquetes,
  detailsPaquete,
  savePaquete,
  deletePaquete,
  saveProductReview,
};
