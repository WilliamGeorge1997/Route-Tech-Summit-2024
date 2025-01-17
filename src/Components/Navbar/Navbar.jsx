import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/route.jpg";

export default function Navbar() {
  return (
    <>
      <nav id="navbar" className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {" "}
            <img src={logo} alt="Route Logo" height={50} width={50} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/data">
                  Data
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/graph">
                  Graph
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
