import {
  get_all_characters,
  get_one_page_character,
  get_planet_by_id,
} from "../services/swapi.js";
import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

import Characters_table from "../components/table/table.jsx";
import {
  showLoading,
  showCorrectLoad,
  showError,
  ShowAllMessage,
} from "../services/infoChips.js";

export default function Characters() {
  const ROWS = 10;
  const toast = useRef(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(0);
  const [charsSearched, setCharsSearched] = useState(0);
  //? variabl que lleva el conteo de los usuarios
  const [totalRecords, setTotalRecords] = useState(0);
  //const [totalData, setTotalData] = useState(allCharacters.length);
  //? Aqui tenemos todos los characters NO SE ENVIA
  const [allCharacters, setAllCharacters] = useState([]);

  //! ESTA SI SE ENVIA
  const [characters, setCharacters] = useState([]);

  const [pageCharacters, setPageCharacters] = useState([]);

  useEffect(() => {
    try {
      debugger;
      //showLoading();
      setLoading(true);
      if (pageCharacters.length === 0) {
        setLoading(false);
        return;
      }
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
      dataSet(data);
      debugger;
      //esta en prubeas de si se quita
      //await sendSearchPlanets(firstPage);
      showCorrectLoad(toast);
      setError(null);
    } catch (err) {
      showError(err, toast);
    } finally {
      setLoading(false);
    }
  };

  async function dataSet(data) {
    setAllCharacters(data);
    setTotalRecords(data.length);
    setTest(test + 1);
    const firstPage = data.slice(0, ROWS);
    await sendSearchPlanets(firstPage);
    return firstPage;
  }

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
    setLoading(false);
  }

  function filterCharactersByName(text) {
    var temporalData = [];
    try {
      setLoading(true);
      text = text.toLowerCase();
      var op = 1;
      if (charsSearched != 0) {
        op = text.length - (charsSearched + 1);
      }
      switch (op) {
        case 0:
          temporalData = searchPart(text, characters);
          setLoading(false);
  
          break;
        default:
          temporalData = searchAll(text, characters);
          setLoading(false);
  
          break;
      }
      sendSearchPlanets(temporalData);
      setCurrentPage(1);
      setTotalRecords((prevCount) => (prevCount = temporalData.length));
      setCharsSearched(text.length);
      
    } finally {
      setLoading(false);
    }
  }

  function searchAll(text) {
    const temporalCharacters = [];
    allCharacters.forEach((chars) => {
      if (chars.name.slice(0, text.length).toLowerCase() == text) {
        temporalCharacters.push(chars);
      }
    });
    setTotalRecords(temporalCharacters.length);
    return temporalCharacters;
  }

  function searchPart(text, characters) {
    const temporalCharacters = [];
    characters.forEach((chars) => {
      if (chars.name.slice(0, text.length).toLowerCase() == text) {
        temporalCharacters.push(chars);
      }
    });
    setTotalRecords(temporalCharacters.length);

    return temporalCharacters;
  }

  function showAllblankInput() {
    setCharacters(allCharacters);
    ShowAllMessage(toast);
    setLoading(false);
    //aqui reiniciamos contadores de las paginas
    setCurrentPage(1);
    setPageCharacters([]);
    setTotalRecords(allCharacters.length);
  }

  return (
    <>
      <Toast ref={toast} />

      <Characters_table
        loading={loading}
        allCharacters={allCharacters}
        characters={characters}
        totalRecords={totalRecords}
        currentPage={currentPage}
        rows={ROWS}
        needToFilter={(words) => {
          //en este caso mejor se filtra aqui, imposible si la tabla se encarga con lazy

          if (words == "") {
            showAllblankInput();
            setLoading(false);
          } else {
            filterCharactersByName(words);
          }
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
