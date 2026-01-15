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
  const [totalPages, setPageInfo] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      showLoading();
      var data = [];
      try {
        setLoading(true);
        if (currentPage === 1) {
          data = await get_all_characters(currentPage);
          setCharacters(data);
        }
        debugger;
        //** Codigo de prueba */
        sendSearchPlanets(characters, currentPage);
        const planetData = await get_planet_by_id(1);
        console.log(planetData);
        //** */
        setPageInfo({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
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

  function sendSearchPlanets(data, page) {
    debugger;
    console.log("pagina" + page + "Data recibida en characters.jsx: ", data);
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
