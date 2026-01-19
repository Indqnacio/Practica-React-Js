/*
@El paginador sigue fallando debo corregirlo todavia
@podriamos agregar una pipeline para poner los colores correctamente(falta ver si conviene usar canvas y el otro metodo)
@Finalmente falta agregar el buscador (que funcione)

@En este caso me falta todavia poner el color de pelo con color(ya)
@Tambien falta hacer que al darle click a una fila salga un modal con mas informacion del personaje
*/

import { ConfirmDialog } from "primereact/confirmdialog";
import { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { IconField } from "primereact/iconfield";
import { InputText } from "primereact/inputtext";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import "./table.css";

import textToColor from "../../pipe/textToColor";
import getColorCodes from "../../pipe/textToColor.js";
import logoImage from "../../assets/images/logo_side_nav.png";
import { get_films_by_id } from "../../services/films";
import { get_starShip_by_id } from "../../services/starShips";
import { get_vehicles_by_id } from "../../services/vehicles";

export default function Characters_table({
  allCharacters,
  characters,
  onPageChange,
  totalRecords,
  currentPage = 1,
  rows = 10,
  needToFilter,
  loading,
}) {
  const [selectedCharacter, setCharacter] = useState(null);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [relatedData, setRelatedData] = useState(null);
  //? Variable de estado para el buscador
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [test2, setTest2] = useState(1);
  const [globalFilter, setGlobalFilter] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: allCharacters, matchMode: FilterMatchMode.STARTS_WITH },
  });

  useEffect(() => {}, [characters]);
  const footerContent = (
    <div>
      <Button
        label="Ok"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );

  const headerElement = (
    <div className="inline-flex align-items-center justify-content-center gap-2">
      <Avatar image={logoImage} shape="circle" />
      <span className="font-bold white-space-nowrap">Mas Informacion</span>
    </div>
  );

  const onRowSelect = async (character) => {
    setCharacter(character);
    setVisible(true);

    // Obtiene información relacionada con los servicios específicos (films, etc.)
    try {
      //necesito investigar si el promise es la mejor opcion
      const films = await Promise.all(
        character.films.map((url) => get_films_by_id(extractIdFromURL(url))),
      );
      const starships = await Promise.all(
        character.starships.map((url) =>
          get_starShip_by_id(extractIdFromURL(url)),
        ),
      );
      const vehicles = await Promise.all(
        character.vehicles.map((url) =>
          get_vehicles_by_id(extractIdFromURL(url)),
        ),
      );

      setRelatedData({ films, starships, vehicles });
      toast.current.show({
        severity: "success",
        detail: "Datos relacionados cargados correctamente",
      });
    } catch (err) {
      toast.current.show({
        severity: "error",
        detail: "Error al cargar datos relacionados",
      });
      console.error(err);
    }
  };

  const extractIdFromURL = (url) => {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
  };

  const getColorsCodes = (data, type) => {
    const colors = getColorCodes(data[`${type}_color`]);
    return (
      <div className="badge_container">
        {colors.map((item, index) => (
          <div
            key={index}
            className="badge_color"
            style={{
              backgroundColor: item.color,
              border: item.color === "#ffffff" ? "1px solid #333" : "none",
              color: item.color === "#ffffff" ? "#000" : "#fff",
            }}
          >
            {item.text}
          </div>
        ))}
      </div>
    );
  };

  //? Es el header que aparece en la tabla
  const renderHeader = () => {
    return (
      <div className="input_search">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText
            style={{ width: "30vw" }}
            value={globalFilterValue}
            onChange={(event) => {
              let _filters = { ...filters };
              _filters["global"].value = event.target.value;
              setGlobalFilterValue(event.target.value);
              needToFilter(event.target.value);
            }}
            placeholder="Buscar personaje"
          />
        </IconField>
      </div>
    );
  };

  const header = renderHeader();

  const first = (currentPage - 1) * rows;
  return (
    <div className="table_container">
      {/* ESTO DEBERIA SEPARARLO EN UN COMPONENTE*/}
      <Dialog
        visible={visible}
        modal
        footer={footerContent}
        header={headerElement}
        style={{ width: "50rem" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div>
          <h2>{selectedCharacter?.name}</h2>
          <p>
            <strong>Altura:</strong> {selectedCharacter?.height} cm
          </p>
          <h3>Películas</h3>
          <ul>
            {relatedData?.films?.map((film, index) => (
              <li key={index}>{film.title}</li>
            ))}
          </ul>
          <h3>Naves espaciales</h3>
          <ul>
            {relatedData?.starships?.map((starship, index) => (
              <li key={index}>{starship.name}</li>
            ))}
          </ul>
          <h3>Vehículos</h3>
          <ul>
            {relatedData?.vehicles?.map((vehicle, index) => (
              <li key={index}>{vehicle.name}</li>
            ))}
          </ul>
        </div>
      </Dialog>
      <Toast ref={toast} />
      <ConfirmDialog />

      <DataTable
        lazy
        first={first}
        rows={rows}
        loading={loading}
        /* Header Buscar */
        globalFilterFields={["name"]}
        emptyMessage={
          <h2 style={{ color: "darkred" }}>{"No hay coincidencias."}</h2>
        }
        header={header}
        filters={filters}
        /* */
        selectionMode="single"
        className="table_style"
        totalRecords={totalRecords}
        value={characters}
        selection={selectedCharacter}
        onSelectionChange={(e) => setCharacter(e.value)}
        dataKey="name"
        onRowDoubleClick={() => onRowSelect(selectedCharacter)}
        metaKeySelection={true}
        paginator
        paginatorLeft={<p>{first + "-" + (first + rows)}</p>}
        paginatorRight={<p>{"Total de personajes:" + totalRecords}</p>}
        onPage={(event) => {
          console.log("Pagina solicitada:", event.page + 1);
          onPageChange(event.page + 1);
        }}
      >
        <Column field="name" header="Nombre"></Column>
        <Column field="height" header="Altura"></Column>
        <Column field="mass" header="peso"></Column>
        <Column
          field="hair_color"
          header="Color de pelo"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={(e) => getColorsCodes(e, "hair")}
        ></Column>

        <Column
          field="eye_color"
          header="Color de ojos"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={(e) => getColorsCodes(e, "eye")}
        ></Column>

        <Column
          field="skin_color"
          header="Color de piel"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={(e) => getColorsCodes(e, "skin")}
        ></Column>
        <Column field="birth_year" header="Año de nacimiento"></Column>
        <Column field="gender" header="genero"></Column>
        <Column field="homeworld" header="Planeta de origen"></Column>
      </DataTable>
    </div>
  );
}
