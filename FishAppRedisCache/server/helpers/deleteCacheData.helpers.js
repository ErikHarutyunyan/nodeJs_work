import { statusCode } from "../constants/index.js";
import { redisClient } from "../database/Redis.database.js";

export async function deleteCacheData(key, req, res, message) {
  console.log("message :", message);
  try {
    const cacheResults = await redisClient.get(key);
    if (cacheResults != null) {
      await redisClient.del(key);
      res
        .status(statusCode.ok)
        .json({ message: `${message.deleteKey} ${key}` });
      return;
    } else {
      res.status(statusCode.badRequest).json({ message: message.notFoundKey });
      return;
    }
  } catch (error) {
    res.status(404);
    return;
  }
}
