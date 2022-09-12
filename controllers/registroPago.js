const { months } = require("moment");
var moment = require("moment-timezone");

const registroPago = require("../models/registroPago");

function findRegistros(req, res) {
  const { mes } = req.body;
  registroPago
    .find({})
    .sort("fechaDate")
    .exec((err, registros) => {
      if (err) {
        res.status(500).send({ message: "Error al obtener registro de pagos" });
      }
      let registroMes = [];
      registros.forEach((registro) => {
        // Sumar uno al mes para homologar al actual (0 enero, 1 febrero)
        if (moment(registro.fechaDate).month() + 1 == mes)
          return registroMes.push(registro);
      });
      res.status(200).send({ registroPagos: registroMes });
    });
}

function createRegistroPago(req, res) {
  const registroPagoDB = new registroPago();
  const { titulo, valor, metodoPago, destino, tipo } = req.body;

  registroPagoDB.fechaDate = new Date();
  registroPagoDB.fechaString = moment()
    .tz("America/Santiago")
    .format("DD-MM-YYYY");
  registroPagoDB.titulo = titulo;
  registroPagoDB.valor = valor;
  registroPagoDB.metodoPago = metodoPago;
  registroPagoDB.destino = destino;
  registroPagoDB.tipo = tipo;

  registroPagoDB.save((err, registroPagoStored) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Error al crear nuevo registro de pago" });
    } else {
      if (!registroPagoDB) {
        res
          .status(500)
          .send({ message: "Error al crear nueevo registro de pago" });
      } else {
        res.status(200).send({ registroPago: registroPagoStored });
      }
    }
  });
}

function deleteRegistroPagoById(req, res) {
  const { id } = req.params;
  registroPago.deleteOne({ _id: id }).exec((error, data) => {
    if (error) {
      console.log(error);
      return error;
    } else {
      return res.status(200).send({ message: "Registro Elimninado" });
    }
  });
}

module.exports = { findRegistros, createRegistroPago, deleteRegistroPagoById };
