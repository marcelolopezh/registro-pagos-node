const express = require("express");

const RegistroPagoController = require("../controllers/registroPago");

const api = express.Router();

api.post("/create-registro-pago", RegistroPagoController.createRegistroPago);
api.post("/registro-pago", RegistroPagoController.findRegistros);
api.delete("/delete-registro-pago/:id", RegistroPagoController.deleteRegistroPagoById)

module.exports = api;