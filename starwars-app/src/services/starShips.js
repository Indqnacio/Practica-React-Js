import axios from "axios";
const URL = "https://swapi.info/api/";
const res = "Fallo su conexion a internet comuniquese con el equipo de INDQ, id:"; 


export const get_starShip_by_id = async (id) => {
  try {
    const response = await axios.get(`${URL}starships/${id}/`);
    return response.data;
  } catch (error) {
    console.error(res + " " + id + " " + error);
    throw error;
  }
};