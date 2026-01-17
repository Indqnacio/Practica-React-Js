import {
  get_all_characters,
  get_one_page_character,
  get_planet_by_id,
} from "../../services/swapi";
import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

import Characters_table from "../../components/table/table";

export default function Characters() {
  const ROWS = 10;
  const toast = useRef(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(0);

  //? Aqui tenemos todos los characters NO SE ENVIA
  const [allCharacters, setAllCharacters] = useState([]);

  //! ESTA SI SE ENVIA
  const [characters, setCharacters] = useState([]);

  const [pageCharacters, setPageCharacters] = useState([]);

  useEffect(() => {
    showLoading()
    
    setLoading(true);
    setTest(test + 1);
    if (pageCharacters.length === 0) return;
    sendSearchPlanets(pageCharacters);
    setLoading(false);
  }, [pageCharacters]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    var data;
    try {
      setLoading(true);

      data = await get_all_characters();
      setAllCharacters(data);

      setTest(test + 1);
      // primera página
      const firstPage = data.slice(0, ROWS);
      await sendSearchPlanets(firstPage);

      //showCorrectLoad();
      setError(null);
    } catch (err) {
      setError(err);
      toast.current.show({
        severity: "error",
        summary: "Error al cargar personajes" + error,
      });
    } finally {
      setLoading(false);
    }
  };

  //*Este es el metodo para convertir los planetas en URL de los arrays en nombres
  async function sendSearchPlanets(data) {
    const temporalData = [...data];
    const oldId = {};
    var planetId = "";
    for (let i = 0; i < temporalData.length; i++) {
      try {
        //si no falla entonces es por que tenemos la URL, y guardaremos la URL en el campo nuevo
        planetId = temporalData[i].homeworld.match(/\d+/)[0];
        temporalData[i].homeworldURL = temporalData[i].homeworld;
      } catch {
        planetId = temporalData[i].homeworldURL.match(/\d+/)[0];
      }

      if (oldId[planetId]) {
        //! Ya existe en caché
        temporalData[i].homeworld = oldId[planetId];
      } else {
        //! No existe, búscalo
        const planetData = await get_planet_by_id(planetId);
        temporalData[i].homeworld = planetData.name;
        oldId[planetId] = planetData.name;
      }
    }
    setCharacters(temporalData);
    setTest(test + 1);
    showCorrectLoad();
  }

  const showLoading = () => {
    toast.current.show({
      severity: "info",
      summary: "Cargando datos",
      life: 3000,
    });
  };

  const showCorrectLoad = () => {
    toast.current.show({
      severity: "success",
      summary: "Datos cargados correctamente",
      life: 3000,
    });
  };

  return (
    <>
      <Toast ref={toast} />

      <Characters_table
        loading={loading}
        allCharacters={allCharacters}
        characters={characters}
        totalRecords={allCharacters.length}
        currentPage={currentPage}
        rows={ROWS}
        needToFilter={(words) => {
          //en este caso mejor se filtra aqui, imposible si la tabla se encarga
        }}
        onPageChange={(page) => {
          setCurrentPage(page);
          const start = (page - 1) * ROWS;
          const end = page * ROWS;
          const pageData = allCharacters.slice(start, end);
          setPageCharacters(pageData);
        }}
      />
    </>
  );
}
