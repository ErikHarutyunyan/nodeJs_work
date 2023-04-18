import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const BaseUrl = process.env.API_URL;
const ApiKey = process.env.API_KEY;
const IconUrl = process.env.ICON_URL;

const makeIconURL = (iconId) => `${IconUrl}${iconId}@2x.png`;

const getFormattedWeatherData = async (city, units = "metric") => {
  const URL = `${BaseUrl}weather?q=${city}&appid=${ApiKey}&units=${units}`;
  const data = await axios.get(URL).then((res) => res.data);

  const {
    weather,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    wind: { speed },
    sys: { country },
    name,
  } = data;

  const { description, icon } = weather[0];

  return {
    description,
    iconURL: makeIconURL(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name,
  };
};

export default getFormattedWeatherData;
