import axios from "axios";
const URL = "https://swapi.info/api/";

export const get_all_characters = async () => {
  try {
    const result = await axios.get("https://swapi.info/api/");
    return result.data;
  } catch (err) {
    throw new Error(
      "Verifique su conexion a internet o contacte a el equipo de INDQ, por el siguiente error: " +
        err
    );
  }
};
export const get_character_by_id = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/people/${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching character with id ${id}:`, error);
    throw error;
  }
};
