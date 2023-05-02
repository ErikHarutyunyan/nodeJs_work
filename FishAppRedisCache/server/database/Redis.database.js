import { createClient } from "redis";

let redisClient;

const redisConnect = async () => {
  redisClient = createClient();

  redisClient.on("error", (error) => console.error(`Error : ${error}`));

  redisClient.on("connect", function () {
    console.log("redis client connected");
  });
  await redisClient.connect();
};

export { redisConnect, redisClient };
