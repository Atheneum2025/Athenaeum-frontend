import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <>
      <nav>
        <ul>
          <li>Statistics</li>
          <li>Views</li>
          <li>Likes</li>
          <li>Reach</li>
        </ul>
      </nav>
      <main>
        <Outlet/>
      </main>
    </>
  );
}

export default Dashboard;
