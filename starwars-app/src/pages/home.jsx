import CarouselWeb from "../components/carousel/carousel.jsx";
import logo from "../assets/images/logo_home.png";


export default function Home({ component, pageProps }) {
  return (
    <>
      <div className="divPrinc">
        <h1>INDQ STAR WARS</h1>
        <img src = {logo} alt="logo" />
        <h1 className="h1_carousel_home">Home</h1>
        <h2>Bienvenido al Star Wars Wiki, par poder ver todo lo relacionado de tus personajes favoritos</h2>
      {/* <Characters /> */}
      <CarouselWeb />
      </div>
    </>
  );
}

