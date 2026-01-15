import Characters_table from "../../components/table";
import { get_all_characters } from "../../services/swapi";
import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

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
    showLoading();
    debugger;
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await get_all_characters(currentPage);
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
    if (pageInfo.previous) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (pageInfo.next) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <>
      <Toast ref={toast} />

      <Characters_table characters={characters} />
    </>
  );
}
