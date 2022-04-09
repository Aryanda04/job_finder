import React from "react";
import FooterAdmin from "./dashboard-footer";
import HeaderStats from "./dashboard-header";
import Navbar from "./dashboard-navbar";
import Sidebar from "./sidebar";

const DashboardComponent = (props) => {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <Navbar />
        <HeaderStats />

        <div className="px-4 md:px-10 mx-auto w-full -m-5 mb-20">
          <div className="m-auto">
            <div className="section">{props.content}</div>
          </div>
        </div>
        <FooterAdmin />
      </div>
    </>
  );
};

export default DashboardComponent;
