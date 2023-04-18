import express from "express";
import dotenv from "dotenv";
import homeWeather from "./routes/apiWeather-routes.js";
import cors from "cors";
const app = express();
app.use(cors());
dotenv.config();
const Port = process.env.PORT || 5000;
app.listen(Port, (error) => {
  error ? console.log(error) : console.log(`listening port ${Port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(homeWeather);

app.use((req, res) => {
  const title = "Error Page";
  res.status(404).render({ title });
});
