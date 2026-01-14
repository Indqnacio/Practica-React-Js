import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Char from "../characters/char.jsx";

export default function Home({ component, pageProps }) {
  return (
    <div>
      <h1>Aqui tendremos la parte de la tabla</h1>
  
      <Char />
    </div>
  );
}


