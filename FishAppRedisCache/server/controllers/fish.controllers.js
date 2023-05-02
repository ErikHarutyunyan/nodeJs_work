import { API_ENDPOINT } from "../config/app.api.js";
import { messageFish } from "../constants/index.js";
import { dataCache } from "../helpers/dataCache.helpers.js";
import { deleteCacheData } from "../helpers/deleteCacheData.helpers.js";
import { getDataSetCache } from "../helpers/getDataSetCache.helpers.js";

const getSpecies = async (req, res) => {
  const key = req.params.species;
  const URL = `${API_ENDPOINT}/species`;
  const getCash = await dataCache(key, req, res, messageFish);
  if (!getCash) await getDataSetCache(URL, key, req, res, messageFish);
};

const deleteSpecies = async (req, res) => {
  const key = req.params.species;
  await deleteCacheData(key, req, res, messageFish);
};

const fishController = { getSpecies, deleteSpecies };

export default fishController;
