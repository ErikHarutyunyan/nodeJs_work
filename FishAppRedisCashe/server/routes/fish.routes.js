import { Router } from "express";
import fishController from "../controllers/fish.controllers.js";

const fishRouter = Router();

fishRouter
  .route("/fish/:species")
  .get(fishController.getSpecies)
  // .delete(fishController.deleteSpecies);

export default fishRouter;
