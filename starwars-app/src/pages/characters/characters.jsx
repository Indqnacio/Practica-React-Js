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
  const [charsSearched, setCharsSearched] = useState(0);

  //? Aqui tenemos todos los characters NO SE ENVIA
  const [allCharacters, setAllCharacters] = useState([]);

  //! ESTA SI SE ENVIA
  const [characters, setCharacters] = useState([]);

  const [pageCharacters, setPageCharacters] = useState([]);

  useEffect(() => {
    try {
      //showLoading();
      setLoading(true);
      if (pageCharacters.length === 0) {setLoading(false); return;}
      sendSearchPlanets(pageCharacters);
    } finally {
    }
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
      showError(err);
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
    setLoading(false);
  }

  function filterCharactersByName(text) {
    const op = text.length - (charsSearched + 1);
    switch (op) {
      case 0:
        setCharacters(searchPart(text, characters));
        break;
      default:
        setCharacters(searchAll(text));
        break;
    }
    setCharsSearched(text.length);
  }

  function searchAll(text) {
    const temporalCharacters = [];
    allCharacters.forEach((chars) => {
      if (chars.name.slice(0, text.length).toLowerCase() == text) {
        temporalCharacters.push(chars);
      }
    });
    return temporalCharacters;
  }

  function searchPart(text, characters) {
    const temporalCharacters = [];
    characters.forEach((chars) => {
      if (chars.name.slice(0, text.length).toLowerCase() == text) {
        temporalCharacters.push(chars);
      }
    });
    return temporalCharacters;
  }
  function showAllblankInput() {
    setCharacters(allCharacters);
    ShowAllMessage();
    
    setLoading(false)
    //falta reiniciar contadores como la pagina, verificar cuales
    setCurrentPage(1);
    setPageCharacters([])
  }

  const showLoading = (e) => {
    toast.current.show({
      severity: "info",
      summary: "Cargando datos ",
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

  const showError = (error) => {
    toast.current.show({
      severity: "error",
      summary: "Error al cargar personajes",
    });
  };

  const ShowAllMessage = () => {
    toast.current.show({
      severity: "info",
      summary: "Se muestran todos los usuarios",
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

          if (words == "") {showAllblankInput(); setLoading(false)}
          else filterCharactersByName(words);
        }}
        onPageChange={(page) => {
          setCurrentPage(page);
          setLoading(true);
          const start = (page - 1) * ROWS;
          const end = page * ROWS;
          const pageData = allCharacters.slice(start, end);
          setLoading(false);
          setPageCharacters(pageData);
        }}
      />
    </>
  );
}
