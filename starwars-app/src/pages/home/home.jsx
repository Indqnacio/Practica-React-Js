import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Characters from "./../characters/characters.jsx";
import CarouselWeb from "../../components/carousel/carousel.jsx";

export default function Home({ component, pageProps }) {
  return (
    <div>
      <h1>Aqui presentamos la pagina web</h1>
      <h2>Bienvenido al Star Wars Wiki</h2>
      <p>pondremos un carrousel para ver que informacion relevante hay.</p>
    {/* <Characters /> */}
      <CarouselWeb />
    </div>
  );
}


