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
router.put("/toto/:nombre", isAuth, isAdmin, async (req, res) => {
  const paqueteNombre = req.params.id;
  const paquete = await Paquete.findOne(paqueteNombre);
  if (paquete) {
    paquete.name = req.body.name;
    paquete.price = req.body.price;
    paquete.image = req.body.image;
    paquete.countInStock = req.body.countInStock;
    paquete.description = req.body.description;
    paquete.paisOrigen = req.body.paisOrigen;
    paquete.horaOrigenIda = req.body.horaOrigenIda;
    paquete.fechaOrigenIda = req.body.fechaOrigenIda;
    paquete.paisDestino = req.body.paisDestino;
    paquete.horaDestinoIda = req.body.horaDestinoIda;
    paquete.fechaDestinoIda = req.body.fechaDestinoIda;
    paquete.horaOrigenVuelta = req.body.horaOrigenVuelta;
    paquete.fechaOrigenVuelta = req.body.fechaOrigenVuelta;
    paquete.horaDestinoVuelta = req.body.horaDestinoVuelta;
    paquete.fechaDestinoVuelta = req.body.fechaDestinoVuelta;
    paquete.soldCount = paquete.soldCount + 1;
    const updatedPaquete = await paquete.save();
    if (updatedPaquete) {
      return res
        .status(200)
        .send({ message: "Paquete Updated", data: updatedPaquete });
    }
  }
  return res.status(500).send({ message: " Error in Updating Paquete." });
});
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  const paqueteId = req.params.id;
  const paquete = await Paquete.findById(paqueteId);
  if (paquete) {
    paquete.name = req.body.name;
    paquete.price = req.body.price;
    paquete.image = req.body.image;
    paquete.countInStock = req.body.countInStock;
    paquete.description = req.body.description;
    paquete.paisOrigen = req.body.paisOrigen;
    paquete.horaOrigenIda = req.body.horaOrigenIda;
    paquete.fechaOrigenIda = req.body.fechaOrigenIda;
    paquete.paisDestino = req.body.paisDestino;
    paquete.horaDestinoIda = req.body.horaDestinoIda;
    paquete.fechaDestinoIda = req.body.fechaDestinoIda;
    paquete.horaOrigenVuelta = req.body.horaOrigenVuelta;
    paquete.fechaOrigenVuelta = req.body.fechaOrigenVuelta;
    paquete.horaDestinoVuelta = req.body.horaDestinoVuelta;
    paquete.fechaDestinoVuelta = req.body.fechaDestinoVuelta;
    paquete.soldCount = paquete.soldCount + 1;
    const updatedPaquete = await paquete.save();
    if (updatedPaquete) {
      return res
        .status(200)
        .send({ message: "Paquete Updated", data: updatedPaquete });
    }
  }
  return res.status(500).send({ message: " Error in Updating Paquete." });
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

router.post("/", isAuth, isAdmin, async (req, res) => {
  const paquete = new Paquete({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    paisOrigen: req.body.paisOrigen,
    fechaOrigenIda: req.body.fechaOrigenIda,
    horaOrigenIda: req.body.horaOrigenIda,
    paisDestino: req.body.paisDestino,
    fechaDestinoIda: req.body.fechaDestinoIda,
    horaDestinoIda: req.body.horaDestinoIda,
    fechaOrigenVuelta: req.body.fechaOrigenVuelta,
    horaOrigenVuelta: req.body.horaOrigenVuelta,
    fechaDestinoVuelta: req.body.fechaDestinoVuelta,
    horaDestinoVuelta: req.body.horaDestinoVuelta,
    soldCount: 0,
  });
  const newPaquete = await paquete.save();
  if (newPaquete) {
    return res
      .status(201)
      .send({ message: "Nuevo paquete creado", data: newPaquete });
  }
  return res.status(500).send({ message: " Error en crear el Paquete." });
});

export default router;
