import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function char() {
  const data = [
    { name: "Luke Skywalker", height: "172", mass: "77" },
    { name: "Darth Vader", height: "202", mass: "136" },
    // Solo seran datos de prueba de momento para luego implementar la API
  ];
  return (
    <PrimeReactProvider>
      <DataTable value={data} paginator rows={5}>
        <Column field="name" header="Name"></Column>
        <Column field="height" header="Height"></Column>
        <Column field="mass" header="Mass"></Column>
      </DataTable>
    </PrimeReactProvider>
  );
}
     