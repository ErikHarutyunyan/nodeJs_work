import axios from "axios";

export async function fetchApiData(URL, key, message) {
  try {
    const { data } = await axios.get(`${URL}/${key || ""}`);
    if (!data.length) {
      throw message.not;
    }
    return data;
  } catch (error) {
    throw error;
  }
}
