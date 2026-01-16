import {
  get_all_characters,
  get_one_page_character,
  get_planet_by_id,
} from "../../services/swapi";
import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

import Characters_table from "../../components/table/table";

export default function Characters() {
  const toast = useRef(null);
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [test, setTest] = useState(0);
  const [totalPages, setPageInfo] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      var data;
      try {
        setLoading(true);

        if (currentPage === 1) {
          data = await get_all_characters(currentPage);
          setCharacters(data);
          setTest(test + 1);
          await sendSearchPlanets(data, currentPage);
          setPageInfo({
            count: data.count,
            next: data.next,
            previous: data.previous,
          });
        } else {
          console.log(characters);
          await sendSearchPlanets(characters, currentPage);
          const planetData = await get_planet_by_id(1);
          console.log(planetData);
          setPageInfo({
            count: characters.count,
            next: characters.next,
            previous: characters.previous,
          });
        }

        showCorrectLoad();
        setError(null);
      } catch (err) {
        setError(err);
        console.log("Error fetching characters:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  //*Este es el metodo para convertir los planetas en URL de los arrays en nombres
  async function sendSearchPlanets(data, page) {
    const temporalData = [...data]; // Array de resultados
    const oldId = {}; // Objeto simple
    for (let i = (page - 1) * 10; i < page * 10; i++) {
      const planetId = temporalData[i].homeworld.match(/\d+/)[0];

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
        characters={characters}
        totalRecords={totalPages.count}
        onPageChange={(page) => {
          console.log("detectamos cambio");
          setCurrentPage(page);
        }}
      />
    </>
  );
}
