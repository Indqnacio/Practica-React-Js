/*
@En este caso me falta todavia poner el color de pelo con color
@Tambien falta hacer que al darle click a una fila salga un modal con mas informacion del personaje
@Finalmente falta agregar el buscador
@podriamos agregar una pipeline para poner los colores correctamente
*/

import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import "./table.css";

import textToColor from "../../pipe/textToColor";
import logoImage from "../../assets/images/logo_side_nav.png";
import { get_films_by_id } from "../../services/films";
import { get_starShip_by_id } from "../../services/starShips";
import { get_vehicles_by_id } from "../../services/vehicles";

export default function Characters_table({
  characters,
  onPageChange,
  totalRecords,
}) {
  const [selectedCharacter, setCharacter] = useState(null);
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [relatedData, setRelatedData] = useState(null);

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
      <span className="font-bold white-space-nowrap">Amy Elsner</span>
    </div>
  );

  const onRowSelect = async (character) => {
    setCharacter(character);
    setVisible(true);

    // Obtiene información relacionada con los servicios específicos (films, etc.)
    try {
      const films = await Promise.all(
        character.films.map((url) => get_films_by_id(extractIdFromURL(url)))
      );
      const starships = await Promise.all(
        character.starships.map((url) =>
          get_starShip_by_id(extractIdFromURL(url))
        )
      );
      const vehicles = await Promise.all(
        character.vehicles.map((url) =>
          get_vehicles_by_id(extractIdFromURL(url))
        )
      );

      /**
       * Extrae ID desde el URL
       * @param {string} url URL del servicio de SWAPI
       * @returns {string} ID extraído del URL
       */
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

  const HairBodyTemplate = (rowData) => {
    const bgColor = textToColor(rowData.hair_color);

    return (
      <div
        className="badge_color"
        style={{
          backgroundColor: bgColor,
        }}
      >
        {rowData.hair_color}
      </div>
    );
  };
  const SkinBodyTemplate = (rowData) => {
    const bgColor = textToColor(rowData.skin_color);

    return (
      <div
        className="badge_color"
        style={{
          backgroundColor: bgColor,
        }}
      >
        {rowData.skin_color}
      </div>
    );
  };
  const EyeBodyTemplate = (rowData) => {
    const bgColor = textToColor(rowData.eye_color);

    return (
      <div
        className="badge_color"
        style={{
          backgroundColor: bgColor,
        }}
      >
        {rowData.eye_color}
      </div>
    );
  };

  return (
    <div className="table_container">

      {/* ESTO DEBERIAMOS SEPARARLO EN UN COMPONENTE*/}
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
        className="table_style"
        value={characters}
        selectionMode="single"
        selection={selectedCharacter}
        onSelectionChange={(e) => setCharacter(e.value)}
        dataKey="name"
        onRowDoubleClick={() => setVisible(true)}
        metaKeySelection={true}
        pageLinkSize={6}
        paginator
        paginatorLeft={<></>}
        paginatorRight={<p>{"Total de personajes:" + characters.length}</p>}
        rows={10}
        totalRecords={totalRecords}
        onPage={(event) => {
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
          body={HairBodyTemplate}
        ></Column>

        <Column
          field="eye_color"
          header="Color de ojos"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={EyeBodyTemplate}
        ></Column>

        <Column
          field="skin_color"
          header="Color de piel"
          showFilterMenu={false}
          filterMenuStyle={{ width: "14rem" }}
          style={{ minWidth: "12rem" }}
          body={SkinBodyTemplate}
        ></Column>
        <Column field="skin_color" header="Color de piel"></Column>
        <Column field="birth_year" header="Año de nacimiento"></Column>
        <Column field="gender" header="genero"></Column>
        <Column field="homeworld" header="Planeta de origen"></Column>
      </DataTable>
    </div>
  );
}
