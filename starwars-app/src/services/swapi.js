import axios from "axios";
const URL = "https://swapi.info/api/";
const res = "Fallo su conexion a internet comuniquese con el equipo de INDQ, id:"; 

export const get_all_characters = async (page = 1) => {
  try {
    const result = await axios.get(`${URL}people/?page=${page}`);
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
    const response = await axios.get(`${URL}people/${id}/`);
    return response.data;
  } catch (error) {
    console.error(res + " " + id + " " + error);
    throw error;
  }
};

export const get_planet_by_id = async (id) => {
  try {
    const response = await axios.get(`${URL}planets/${id}/`);
    return response.data;
  } catch (error) {
    console.error(res + " " + id + " " + error);
    throw error;
  }
};

// lo que espero que haga la funcion es evitar traerme todos los usuarios y mejor traer de diez en diez
export const get_one_page_character = async (page) => {
  const data = [];
  try {
    for (let i = page * 10; i > (page - 1) * 10; i--) {

      const response = await axios.get(`${URL}people/${i}/`);
      data.push(response.data);
    }
    //verificar que se ordene DESC los personajes
    data.reverse();
    return data;

  } catch (error) {
    console.error(`Error fetching characters on page ${page}:`, error);
    throw error;
  }
};
