import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import logoImage from "../assets/logo_side_nav.png";
import { Link } from "react-router-dom";

export default function SideNav() {
  const [visible, setVisible] = useState(false);

  const customIcons = (
    <React.Fragment>
      <button className="p-sidebar-icon p-link mr-2">
      </button>
    </React.Fragment>
  );

  const customHeader = (
    <div className="flex align-items-center gap-2">
      <Avatar
        image={logoImage}
        shape="circle"
      />
      <span className="font-bold"> Star Wars Wiki</span>
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Sidebar
        header={customHeader}
        visible={visible}
        onHide={() => setVisible(false)}
        icons={customIcons}
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
      <Button icon="pi pi-align-justify" onClick={() => setVisible(true)} />
    </div>
  );
}
