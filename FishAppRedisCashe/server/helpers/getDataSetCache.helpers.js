import { fetchApiData } from "../services/fetchApiData.services.js";
import { DEFAULT_EXPIRATION } from "../constants/index.js";

export async function getDataSetCache(URL, key, req, res) {
  let results;
  try {
    results = await fetchApiData(URL, key);
    if (results.length === 0) {
      throw "API returned an empty array";
    }
    await redisClient.set(key, JSON.stringify(results), {
      EX: DEFAULT_EXPIRATION,
    });

    res.send({
      fromCache: false,
      data: results,
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(404).send("Data unavailable");
  }
}
