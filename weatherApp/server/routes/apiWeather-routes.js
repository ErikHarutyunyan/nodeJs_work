import { Router } from "express";
import getFormattedWeatherData from "../controllers/apiWeather-controller.js";

const homeWeather = Router();

homeWeather.post("/api/weather", async (req, res) => {
  const { city, units } = req.body;
  const data = await getFormattedWeatherData(city, units);
  res.send(data);
});

export default homeWeather;
