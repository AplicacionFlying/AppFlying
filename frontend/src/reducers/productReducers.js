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
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_FAIL,
  PRODUCT_REVIEW_SAVE_RESET,
} from "../constants/productConstants";

function paqueteListReducer(state = { paquetes: [] }, action) {
  switch (action.type) {
    case PAQUETE_LIST_REQUEST:
      return { loading: true, paquetes: [] };
    case PAQUETE_LIST_SUCCESS:
      return { loading: false, paquetes: action.payload };
    case PAQUETE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function paqueteDetailsReducer(state = { paquete: { reviews: [] } }, action) {
  switch (action.type) {
    case PAQUETE_DETAILS_REQUEST:
      return { loading: true };
    case PAQUETE_DETAILS_SUCCESS:
      return { loading: false, paquete: action.payload };
    case PAQUETE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function paqueteDeleteReducer(state = { paquete: {} }, action) {
  switch (action.type) {
    case PAQUETE_DELETE_REQUEST:
      return { loading: true };
    case PAQUETE_DELETE_SUCCESS:
      return { loading: false, paquete: action.payload, success: true };
    case PAQUETE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function paqueteSaveReducer(state = { paquete: {} }, action) {
  switch (action.type) {
    case PAQUETE_SAVE_REQUEST:
      return { loading: true };
    case PAQUETE_SAVE_SUCCESS:
      return { loading: false, success: true, paquete: action.payload };
    case PAQUETE_SAVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function productReviewSaveReducer(state = {}, action) {
  switch (action.type) {
    case PRODUCT_REVIEW_SAVE_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_SAVE_SUCCESS:
      return { loading: false, review: action.payload, success: true };
    case PRODUCT_REVIEW_SAVE_FAIL:
      return { loading: false, errror: action.payload };
    case PRODUCT_REVIEW_SAVE_RESET:
      return {};
    default:
      return state;
  }
}

export {
  paqueteListReducer,
  paqueteDetailsReducer,
  paqueteSaveReducer,
  paqueteDeleteReducer,
  productReviewSaveReducer,
};
