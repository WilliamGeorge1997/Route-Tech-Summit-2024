import React from "react";
import { Helmet } from "react-helmet";
import logo from "../../images/route.jpg";
import { Link } from "react-router-dom";


export default function Home() {
  return (
    <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home</title>
        </Helmet>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="me-2">
          <img src={logo} alt="Route Logo" height={200} width={200} />
        </div>
        <div className="text-center ms-2">
          <h2 className="h1">Welcome</h2>
          <h3 className="h2">To</h3>
          <p className="h4">Route Tech Summit 2024 Task</p>
          <Link to="/data" className="me-2" >DataTable</Link>
          <Link to="/graph"  className="ms-2">Transactions Graph</Link>
        </div>
      </div>
    </>
  );
}
