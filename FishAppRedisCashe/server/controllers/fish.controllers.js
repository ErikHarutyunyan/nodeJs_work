import { API_ENDPOINT } from "../config/app.api.js";
import { messageFish, statusCode } from "../constants/constants.js";
import { dataCache } from "../helpers/dataCache.helpers.js";
import { getDataSetCache } from "../helpers/getDataSetCache.helpers.js";
// import fishService from "../services/fishService.js";


const getSpecies = async (req, res) => {
  const key = req.params.species;
  const URL = `${API_ENDPOINT}`;
  const getCash = await dataCache(key, req, res);
  if (!getCash) await getDataSetCache(URL, key, req, res);
};

const fishController = { getSpecies };
export default fishController;
