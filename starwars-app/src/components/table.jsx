import React, { useState, useRef, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";

export default function Characters_table() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const toast = useRef(null);

  //al parecer el Toast son como los chips o las advertencias de angular
  const onRowSelect = (event) => {
    toast.current.show({
      severity: "info",
      summary: "Product Selected",
      detail: `Name: ${event.data.name}`,
      life: 3000,
    });
  };

  const onRowUnselect = (event) => {
    toast.current.show({
      severity: "warn",
      summary: "Product Unselected",
      detail: `Name: ${event.data.name}`,
      life: 3000,
    });
  };



  const data = [
    { id: 1, name: "Astra Vorn", height: "182", mass: "80" },
    { id: 2, name: "Korrin Tal", height: "168", mass: "62" },
    { id: 3, name: "Milo Rager", height: "175", mass: "74" },
    { id: 4, name: "Nyx Solari", height: "160", mass: "54" },
    { id: 5, name: "Thane Vex", height: "190", mass: "95" },
    { id: 6, name: "Lyra Fen", height: "158", mass: "49" },
    { id: 7, name: "Jarek Dune", height: "185", mass: "88" },
    { id: 8, name: "Seren Kade", height: "170", mass: "65" },
    { id: 9, name: "Vela Orin", height: "165", mass: "58" },
    { id: 10, name: "Quinn Ryl", height: "177", mass: "76" },
    { id: 11, name: "Bex Thal", height: "181", mass: "82" },
    { id: 12, name: "Oris Nahl", height: "193", mass: "102" },
    // Solo serán datos de prueba de momento para luego implementar la API
];

  return (
    <div className="table_container">
      <Toast ref={toast} />
      <DataTable
        value={data}
        selectionMode="double"
        selection={selectedProduct}
        onSelectionChange={(e) => setSelectedProduct(e.value)}
        dataKey="id"
        onRowSelect={onRowSelect}
        onRowUnselect={onRowUnselect}
        metaKeySelection={true}
        paginator
        rows={5}
      >
        <Column field="name" header="Name"></Column>
        <Column field="height" header="Height"></Column>
        <Column field="mass" header="Mass"></Column>
      </DataTable>
    </div>
  );
}
