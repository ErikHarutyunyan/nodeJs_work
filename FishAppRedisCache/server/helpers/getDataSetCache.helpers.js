import { fetchApiData } from "../services/fetchApiData.services.js";
import { DEFAULT_EXPIRATION, statusCode } from "../constants/index.js";
import { redisClient } from "../database/Redis.database.js";

export async function getDataSetCache(URL, key, req, res, messageFish) {
  let results;
  try {
    results = await fetchApiData(URL, key, messageFish);
    console.log("results :", results);
    if (results.length === 0) {
      throw "API returned an empty array";
    }
    await redisClient.set(key, JSON.stringify(results), {
      EX: DEFAULT_EXPIRATION,
    });
    res.status(statusCode.ok).send({
      fromCache: false,
      data: results,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(statusCode.badRequest).send({ message: error });
  }
}
