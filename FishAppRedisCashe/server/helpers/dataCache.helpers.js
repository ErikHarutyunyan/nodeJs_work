import redisConnect from "./../database/Redis.database.js";
await redisConnect;

export async function dataCache(key, req, res) {
  let results;
  try {
    const cacheResults = await redisClient.get(key);
    if (cacheResults != null) {
      results = JSON.parse(cacheResults);
      res.send({
        fromCache: true,
        data: results,
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    res.status(404);
  }
}
