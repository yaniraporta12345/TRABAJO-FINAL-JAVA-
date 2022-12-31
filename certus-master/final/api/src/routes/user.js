const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

// create user
router.post("/users", (req, res) => {
  const user = userSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all users
router.get("/users", (req, res) => {
  userSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get a user
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
  .findById(id).select(['nombre', 'usuario', 'correo', 'contraseña'])
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});




// update a user ok 
router.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, correo, usuario, contraseña } = req.body;

  userSchema
    .updateOne({ _id: id }, { $set: { nombre, correo, usuario, contraseña } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }))
})





// Iniciar session ok 
router.post("/users/login", (req, res) => {
  const { correo, contraseña } = req.body;
  userSchema
  .find({email: correo, contraseña: contraseña }).select("id")
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});




// get all favorites
/**
 * :id => id de usuario
 * devuelve lista de pokemones a¿marcados como favorito segun id de usuario
 */
router.get("/users/favorites/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .findById(id).select("favorites")
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// add favorites ok
/**
 * :id => id de usuario
 * body estructura => "favorite": {"name":"mass", "peso": 4, "altura":20, "img": "www.asd.com/asdklasj/asdas.jpg"}
 * Agrega un pokemon a la lista de favoritos
 */
router.put("/users/favorites/:id", (req, res) => {
  const { id } = req.params;
  const { favorite } = (req.body);
  userSchema
    .updateOne({ _id: id }, { $push: { favorites:favorite } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete a favorite
/**
 * :id => id de usuario
 * body estructura => "favorite": {"name":"mass", "peso": 4, "altura":20, "img": "www.asd.com/asdklasj/asdas.jpg"}
 * Quita un pokemon a la lista de favoritos
 */
router.delete("/users/favorites/:id", (req, res) => {
  const { id } = req.params;
  const { favorite } = (req.body);
  userSchema
    .updateOne({ _id: id },{$pull: {favorites:favorite}})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});





// delete a user
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


module.exports = router;