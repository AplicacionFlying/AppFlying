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
  fechaOrigenIda: { type: String, requiere: true },
  horaOrigenIda: { type: String, requiere: true },
  paisDestino: { type: String, require: true },
  fechaDestinoIda: { type: String, requiere: true },
  horaDestinoIda: { type: String, requiere: true },
  fechaOrigenVuelta: { type: String, requiere: true },
  horaOrigenVuelta: { type: String, requiere: true },
  fechaDestinoVuelta: { type: String, requiere: true },
  horaDestinoVuelta: { type: String, requiere: true },

  reviews: [reviewSchema],
});

const paqueteModel = mongoose.model("Paquete", paqueteSchema);

export default paqueteModel;
