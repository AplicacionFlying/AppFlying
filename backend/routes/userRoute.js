import express from "express";
import User from "../models/userModel";
import { getToken, isAuth } from "../util";
import config from "../config";
import jwt from "jsonwebtoken";

const router = express.Router();
const buscarId = (token) => {
  console.log("jola");
  if (token) {
    const onlyToken = token.slice(7, token.length);
    const decode = jwt.verify(onlyToken, config.JWT_SECRET);
    const idUser = decode._id;
    return idUser;
  } else {
    return res.status(401).send({ message: "Token anda." });
  }
};
router.get("/", isAuth, async (req, res) => {
  const token = req.headers.authorization;
  const idUser = buscarId(token);
  const user = await User.findById(idUser);
  console.log(user);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

router.put("/:id", isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ message: "Invalid Email or Password." });
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ message: "Invalid User Data." });
  }
});

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Basir",
      email: "admin@example.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

export default router;
