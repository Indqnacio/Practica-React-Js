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
    <div className="flex align-items-center gap-2">
      <Avatar image={logoImage} shape="circle" />
      <span className="font-bold"> Star Wars Wiki</span>
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
          <div>
            <p>Aquí pondremos el routing a:</p>
            <ul className="sidenav_links">
              <Link to="/" className="navbar-logo">
                <li>Home</li>
              </Link>
              <Link to="/characters" className="navbar-logo">
                <li>Personajes</li>
              </Link>
            </ul>
          </div>
        </Sidebar>
      </div>
    </>
  );
}
