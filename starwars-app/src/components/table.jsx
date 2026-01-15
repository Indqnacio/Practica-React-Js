/*
@En este caso me falta todavia poner el color de pelo con color
@Ademas falta que el planeta de origen aparezca como informacion legible
@Tambien falta hacer que al darle click a una fila salga un modal con mas informacion del personaje
@Finalmente falta agregar el buscador
@podriamos agregar una pipeline para poner los colores correctamente
*/

import { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import "../components/table.css";
import textToColor from "../pipe/textToColor";

export default function Characters_table({ characters }) {
  const [selectedCharacter, setCharacter] = useState(null);
  const toast = useRef(null);

  //al parecer el Toast son como los chips o las advertencias de angular
  //en este caso el modal sera echo con un dialog, provisionalmente sera con el confirm
  const onRowSelect = (event) => {
    confirmDialog({
      message:
        "el personaje es " + event.data.name + ". ¿Desea ver mas detalles?",
      header: "Ver mas detalles",
      icon: "pi pi-eye",
      defaultFocus: "accept",
      reject,
      accept,
    });
  };

  //estos dos los borraremos
  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
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
      <Toast ref={toast} />
      <ConfirmDialog />
      <DataTable
        className="table_style"
        value={characters}
        selectionMode="single"
        selection={selectedCharacter}
        onSelectionChange={(e) => setCharacter(e.value)}
        dataKey="name"
        onRowSelect={onRowSelect}
        metaKeySelection={true}
        paginator
        rows={10}
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
