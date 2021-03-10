import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const paqueteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  countInStock: { type: Number, default: 0, required: true },
  description: { type: String, required: true },
  rating: { type: Number, default: 0, required: true },
  numReviews: { type: Number, default: 0, required: true },
  paisOrigen: { type: String, require: true },
  fechaOrigen: { type: String, requiere: true },
  horaOrigen: { type: String, requiere: true },
  paisDestino: { type: String, require: true },
  fechaDestino: { type: String, requiere: true },
  horaDestino: { type: String, requiere: true },
  reviews: [reviewSchema],
});

const paqueteModel = mongoose.model("Paquete", paqueteSchema);

export default paqueteModel;
