const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const { API_VERSION } = require("./config");

const registroRoutes = require("./routers/registroPago");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())

app.use(`/api/${API_VERSION}`,registroRoutes)

module.exports = app;