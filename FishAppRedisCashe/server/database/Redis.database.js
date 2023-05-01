import { createClient } from "redis";

let redisClient;

export default redisConnect =  (async () => {
  redisClient = createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  redisClient.on("connect", function () {
    console.log("redis client connected");
  });
  await redisClient.connect();
})();

// const redis = require("redis");
// const redisClient = redis.createClient();
// redisClient.on("connect", function () {
//   console.log("redis client connected");
// });
// module.exports = redisClient;
