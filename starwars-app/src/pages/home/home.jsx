import CarouselWeb from "../../components/carousel/carousel.jsx";
import './home.css'
export default function Home({ component, pageProps }) {
  return (
    <>
      <div className="divPrinc">
        <h1>INDQ STAR WARS</h1>
        <h1 style={{ color: "#fff", marginBottom: "20px" }}>Home</h1>
        <h2>Bienvenido al Star Wars Wiki, par poder ver todo lo relacionado de tus personajes favoritos</h2>
      {/* <Characters /> */}
      <CarouselWeb />
      </div>
    </>
  );
}

