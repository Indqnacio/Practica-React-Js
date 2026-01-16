import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";
import { Fragment } from "react";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
export default function CarouselWeb()
{
 const departments = [
    {
      name: "Desarrollo",
      description: "Soporte técnico y desarrollo de software",
      icon: "pi pi-github",
      bgColor: "#007BFF",
    },
    {
      name: "Telecomunicaciones",
      description: "Redes y conectividad",
      icon: "pi pi-sitemap",
      bgColor: "#28A745",
    },
    {
      name: "Robotica",
      description: "Programacion de sistemas automatizados",
      icon: "pi pi-microchip-ai",
      bgColor: "#17A2B8",
    },
    {
      name: "Atención al Cliente",
      description: "Soporte al usuario",
      icon: "pi pi-comments",
      bgColor: "#DC3545",
    },
  ];

  // Con esto tenemos cards para dispositivos
  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 3 },
    { breakpoint: "768px", numVisible: 2, numScroll: 3 },
    { breakpoint: "560px", numVisible: 1, numScroll: 3 },
  ];
  // Template para renderizar las tarjetas de los departamentos
  const departmentTemplate = (department) => (
    <Card
      title={department.name}
      style={{ backgroundColor: department.bgColor, color: "#fff", textAlign: "center" }}
      className="department-card"
    >
      <i className={`${department.icon}`} style={{ fontSize: "2rem", marginBottom: "1rem" }}></i>
      <p>{department.description}</p>
    </Card>
  );

  return (
  <Fragment>
     <div className="carousel-container">
        <Carousel
          value={departments}
          itemTemplate={departmentTemplate}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          circular
          autoplayInterval={5000}
        />
      </div>
  </Fragment>);
}