import { statusCode } from "../constants/index.js";
import { redisClient } from "../database/Redis.database.js";

export async function dataCache(key, req, res, message) {
  let results;
  try {
    const cacheResults = await redisClient.get(key);
    if (cacheResults != null) {
      results = JSON.parse(cacheResults);
      res.status(statusCode.ok).send({
        fromCache: true,
        data: results,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    res.status(statusCode.conflict);
  }
}
