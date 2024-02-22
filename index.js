import express, { response } from "express";

const app = express();
const url = "/api";

app.use(express.json());

app.get(`${url}/test`, (request, response) => {
  console.log("FUNCIONA PA");
  res.send('Hello World!');

});

app.post(`${url}/test`, (request, response) => {
  console.log("recibido");
  response.json({
    code: "200",
    status: "OK",
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
