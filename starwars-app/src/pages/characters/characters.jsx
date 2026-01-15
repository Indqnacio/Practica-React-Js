import { get_all_characters, get_one_page_character } from "../../services/swapi";
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
    //debugger;
    const fetchData = async () => {
      showLoading();
      try {
        setLoading(true);
        const data = await get_one_page_character(currentPage);
        setCharacters(data);
        setPageInfo({
          count: data.count,
          next: data.next,
          previous: data.previous,
        });
        console.log(data);
        //verificar que si sirva
        showCorrectLoad();
        setError(null);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const showLoading = () => {
        toast.current.show({
        severity: "info",
        summary: "Cargando datos",
        life: 3000,
      });
  }

  const showCorrectLoad = () => {
        toast.current.show({
        severity: "success",
        summary: "Datos cargados correctamente",
        life: 3000,
      });
  }
 const handlePreviousPage = () => {  
  debugger;  
      console.log( "atras")
      setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
      console.log( "adelante")
      setCurrentPage(currentPage + 1)
  }

  return (
    <>
      <Toast ref={toast} />

      <Characters_table characters={characters} onNextPage={handleNextPage} onPreviousPage={handlePreviousPage} />
    </>
  );
}
