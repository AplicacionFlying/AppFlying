import express from "express";
import Paquete from "../models/PaqueteModel";
import { isAuth, isAdmin } from "../util";

const router = express.Router();

//Traer todos los productos al home
router.get("/", async (req, res) => {
  const paquetes = await Paquete.find({});
  res.send(paquetes);
});
// router.get('/', async (req, res) => {
//   const category = req.query.category ? { category: req.query.category } : {};
//   const searchKeyword = req.query.searchKeyword
//     ? {
//         name: {
//           $regex: req.query.searchKeyword,
//           $options: 'i',
//         },
//       }
//     : {};
//   const sortOrder = req.query.sortOrder
//     ? req.query.sortOrder === 'lowest'
//       ? { price: 1 }
//       : { price: -1 }
//     : { _id: -1 };
//   const products = await Product.find({ ...category, ...searchKeyword }).sort(
//     sortOrder
//   );
//   res.send(products);
// });

router.get("/:id", async (req, res) => {
  const paquete = await Paquete.findOne({ _id: req.params.id });
  if (paquete) {
    res.send(paquete);
  } else {
    res.status(404).send({ message: "Paquete Not Found." });
  }
});
router.post("/:id/reviews", isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((a, c) => c.rating + a, 0) /
      product.reviews.length;
    const updatedProduct = await product.save();
    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: "Review saved successfully.",
    });
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;
    const updatedProduct = await product.save();
    if (updatedProduct) {
      return res
        .status(200)
        .send({ message: "Product Updated", data: updatedProduct });
    }
  }
  return res.status(500).send({ message: " Error in Updating Product." });
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const deletedPaquete = await Paquete.findById(req.params.id);
  if (deletedPaquete) {
    await deletedPaquete.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});

//Ingresar un nuevo

router.post("/", async (req, res) => {
  const paquete = new Paquete({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    paisOrigen: req.body.paisOrigen,
    fechaOrigen: req.body.fechaOrigen,
    horaOrigen: req.body.horaOrigen,
    paisDestino: req.body.paisDestino,
    fechaDestino: req.body.fechaDestino,
    horaDestino: req.body.horaDestino,
  });
  const newPaquete = await paquete.save();
  if (newPaquete) {
    return res
      .status(201)
      .send({ message: "Nuevo producto creado", data: newPaquete });
  }
  return res.status(500).send({ message: " Error en crear el Paquete." });
});

export default router;
