import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Agence from "views/admin/Agence.js";
import Personnes from "views/admin/Personnes.js";
import Voitures from "views/admin/Voitures.js";
import Client from "views/admin/Client.js";
import Reservation from "views/admin/Reservation.js";
import Reservations from "views/admin/Reservations.js";


export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-6 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/dashboard" exact component={Dashboard} />
            <Route path="/admin/Agence" exact component={Agence} />
            <Route path="/admin/Personnes" exact component={Personnes} />
            <Route path="/admin/Voitures" exact component={Voitures} />
            <Route path="/admin/Client" exact component={Client} />
            <Route path="/admin/Reservation" exact component={Reservation} />
            <Route path="/admin/Reservations" exact component={Reservations} />
            <Redirect from="/admin" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
