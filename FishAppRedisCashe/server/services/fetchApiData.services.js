export async function fetchApiData(URL, key) {
  const apiResponse = await axios.get(`${URL}/${key || ""}`);
  return apiResponse.data;
}
