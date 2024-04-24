import express from "express";
import https from "https";
import fs from "fs";
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/cmsis.ar/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/cmsis.ar/fullchain.pem"),
};

const app = express();
const url = "/api";
const idsMerchantOrders = [];

app.use(express.json());

app.get(`${url}`, (request, response) => {
  console.log("TEST");
  response.status(200).send("<h1>Hola Mundo</h1>");
});

app.get(`${url}/test`, (request, response) => {
  console.log("Sistema CMSIS buscando ID");
  if (idsMerchantOrders.length > 0) {
    const idResponse = idsMerchantOrders[0];
    response.status(200).json({ id: idResponse });
  } else {
    response.status(204).json({ error: "not data" });
  }
});

app.delete(`${url}/test`, (request, response) => {
  console.log("Borrando");
  console.log(idsMerchantOrders);
  const idDeleted = idsMerchantOrders.slice(0, 1);
  idsMerchantOrders.length = 0;
  console.log(idsMerchantOrders);
  response.status(200).json({ idBorrado: idDeleted });
});

app.post(`${url}/test`, (request, response) => {
  console.log("Respuesta MP Recibida");
  const body = request.body;
  console.log(body);
  if (body.topic == "merchant_order") {
    const parts = body.resource.split("/");
    const idMerchantOrder = parts[parts.length - 1];
    if (idsMerchantOrders.length > 0) {
      idsMerchantOrders.splice(0, idsMerchantOrders.length);
      idsMerchantOrders.push(idMerchantOrder);
    } else {
      idsMerchantOrders.push(idMerchantOrder);
    }
  }
  response.status(200).json({
    code: "200",
    status: "OK",
  });
});

const PORT = process.env.PORT || 3001;
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
