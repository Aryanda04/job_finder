import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import LayoutComponent from "../components/layoutComponent";
import { DataJobProvider } from "../context/DataJobContext";
// import GameForm from "../game-form/game-form";
import JobList from "../job-list/list-job";
import Home from "../home/LandingPage";
import Login from "../login/login";
import Regist from "../registrasi/resgistrasi";
import Dashboard from "../dashboard/dashboard";
import DashboardComponent from "../components/dashboard-component/dashboardComponent";

const Pages = () => {
  return (
    <>
      <BrowserRouter>
        <DataJobProvider>
          {/* <Navbar /> */}
          <Switch>
            <Route path="/" exact>
              <LayoutComponent content={<Home />} />
            </Route>
            <Route path="/dashboard/list-job-vacancy" exact>
              <DashboardComponent content={<JobList />} />
            </Route>
            <Route path="/dashboard" exact>
              <DashboardComponent content={<Dashboard />} />
            </Route>
            <Route path="/login" exact>
              <LayoutComponent content={<Login />} />
            </Route>
            <Route path="/register" exact>
              <LayoutComponent content={<Regist />} />
            </Route>
          </Switch>
        </DataJobProvider>
      </BrowserRouter>
    </>
  );
};

export default Pages;
