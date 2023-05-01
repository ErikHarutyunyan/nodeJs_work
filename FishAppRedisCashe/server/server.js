import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import morgan from "morgan";
const port = process.env.PORT || 3002;

import { notFound } from "./middleware/notFound.js";
import {
  DEFAULT_EXPIRATION,
  messageFish,
  statusCode,
} from "./constants/index.js";
import { createClient } from "redis";
// import axios from "axios";
import fishRouter from "./routes/fish.routes.js";

const app = express();

let redisClient;

(async () => {
  redisClient = createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  await redisClient.connect();
})();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

// async function fetchApiData(URL, key) {
//   const apiResponse = await axios.get(`${URL}/${key || ""}`);
//   return apiResponse.data;
// }

// async function dataCache(key, req, res) {
//   let results;
//   try {
//     const cacheResults = await redisClient.get(key);
//     if (cacheResults != null) {
//       results = JSON.parse(cacheResults);
//       res.send({
//         fromCache: true,
//         data: results,
//       });
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(404);
//   }
// }

// async function getData(URL, key, req, res) {
//   let results;
//   try {
//     results = await fetchApiData(URL, key);
//     if (results.length === 0) {
//       throw "API returned an empty array";
//     }
//     await redisClient.set(key, JSON.stringify(results), {
//       EX: DEFAULT_EXPIRATION,
//     });

//     res.send({
//       fromCache: false,
//       data: results,
//     });
//     return;
//   } catch (error) {
//     console.error(error);
//     res.status(404).send("Data unavailable");
//   }
// }

// async function deleteData(key, req, res) {
//   try {
//     const cacheResults = await redisClient.get(key);
//     if (cacheResults != null) {
//       await redisClient.del(key);
//       res
//         .status(statusCode.ok)
//         .send({ message: `${messageFish.deleteKeySpecies} ${key}` });
//     } else {
//       res
//         .status(statusCode.badRequest)
//         .send({ message: messageFish.notFoundSpeciesKey });
//     }
//   } catch (error) {
//     res.status(404);
//   }
// }

app.get("/fish/:species", async (req, res) => {
  const key = req.params.species;
  const URL = `https://www.fishwatch.gov/api/species`;
  const getCash = await dataCache(key, req, res);
  if (!getCash) await getData(URL, key, req, res);
});

app.delete("/fish/:species", async (req, res) => {
  const key = req.params.species;
  await deleteData(key, req, res);
});

app.use(fishRouter);
app.use(notFound);

app.listen(port, (error) => {
  error
    ? console.log("error", error)
    : console.log(`listening port ${process.env.PORT}`);
});
