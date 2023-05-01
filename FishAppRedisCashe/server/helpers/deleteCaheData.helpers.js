async function deleteData(key, req, res) {
  try {
    const cacheResults = await redisClient.get(key);
    if (cacheResults != null) {
      await redisClient.del(key);
      res
        .status(statusCode.ok)
        .send({ message: `${messageFish.deleteKeySpecies} ${key}` });
    } else {
      res
        .status(statusCode.badRequest)
        .send({ message: messageFish.notFoundSpeciesKey });
    }
  } catch (error) {
    res.status(404);
  }
}
