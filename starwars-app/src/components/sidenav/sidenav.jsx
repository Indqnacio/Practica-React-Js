import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Link } from "react-router-dom";

import "./sidenav.css";
import logoImage from "../../assets/images/logo_side_nav.png";

export default function SideNav() {
  const [visible, setVisible] = useState(false);

  const customHeader = (
    <div className="logos">
      <Avatar image={logoImage} shape="circle" />
      <span> Star Wars Wiki</span>
    </div>
  );

  return (
    <>
      <div className="navBar">
        <div className="navBar_Content">
          <Button icon="pi pi-align-justify" onClick={() => setVisible(true)} />
        </div>
      </div>
      <div className="card flex justify-content-center">
        <Sidebar
          header={customHeader}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <div className="sidenav_content">
            <h3>Busquedas Principales:</h3>
            <ul>
              <Link to="/" className="navbar-logo">
                <li className="text_link_sideNav">Home</li>
              </Link>
              <Link to="/characters">
                <li className="text_link_sideNav">Personajes</li>
              </Link>
            </ul>
          </div>
        </Sidebar>
      </div>
    </>
  );
}
