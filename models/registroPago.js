const mongoose = require("mongoose")
const Schema = mongoose.Schema

const registroPagoSchema = Schema({
    fechaString:String,
    fechaDate:Date,
    titulo:String,
    valor:Number,
    metodoPago:String,
    destino:String,
    tipo:String
})

module.exports = mongoose.model("RegistroPago",registroPagoSchema);