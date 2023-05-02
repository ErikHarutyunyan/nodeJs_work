import { statusCode } from "../constants";

export const notFound = (req, res) =>
  res.status(statusCode.notFound).send("Route does not exist");
