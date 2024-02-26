import express from "express";

const app = express();
const url = "/api";

const idsMerchantOrders = [];

app.use(express.json());

app.get(`${url}/test`, (request, response) => {
  console.log("FUNCIONA PA");
  if (idsMerchantOrders.length > 0) {
    const idResponse = idsMerchantOrders.shift();
    response.status(200).json({ id: idResponse });
  } else {
    response.status(204).json({ error: "not data" });
  }
  //response.send("<h1>Hola Mundo</h1>");
});

app.post(`${url}/test`, (request, response) => {
  console.log("recibido");
  const body = request.body;
  console.log(body);
  console.log(body.topic);
  console.log(body.resource);
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
