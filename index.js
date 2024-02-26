import express from "express";

const app = express();
const url = "/api";
const idsMerchantOrders = [];

app.use(express.json());

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
  const idDeleted = idsMerchantOrders.shift();
  response.status(200).json({ idBorrado: idDeleted });
});

app.post(`${url}/test`, (request, response) => {
  console.log("Respuesta MP Recibida");
  const body = request.body;
  console.log(body);
  if (body.topic == "merchant_order") {
    const parts = body.resource.split("/");
    const idMerchantOrder = parts[parts.length - 1];
    if (!idsMerchantOrders.includes(idMerchantOrder)) {
      idsMerchantOrders.push(idMerchantOrder);
    }
  }
  response.status(200).json({
    code: "200",
    status: "OK",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
