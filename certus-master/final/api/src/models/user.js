const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: false
  },
  usuario: {
    type: String,
    required: true
  },
  contraseña: {
    type: String,
    required: false
  },
  favorites: {
    type: Object,
    required: false
  }
});

module.exports = mongoose.model('User', userSchema);