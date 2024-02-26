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
  }
});

app.post(`${url}/test`, (request, response) => {
  console.log("recibido");
  const body = request.body;
  console.log(body);
  console.log(body.topic);
  console.log(body.resource);
  if (body.topic == "merchant_order") {
    parts = body.resource.split("/");
    console.log(parts);
    console.log(parts[-1]);
    idsMerchantOrders.push(parts[-1]);
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
