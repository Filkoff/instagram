import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Profile from "../components/Profile/Index";
import Dashboard from "../pages/Dashboard";
import * as ROUTES from "../constants/routes";
import Header from "../components/Header/Header";

function AppRouter() {
  const isAuth = useSelector((state) => state.user.currentUser);
  return isAuth ? (
    <Switch>
      <Route path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.SIGN_UP} component={SignUp} />
      <Route path={ROUTES.PROFILE} component={Profile} />
      <Route path={ROUTES.DASHBOARD} component={Dashboard} />
      <Route path={ROUTES.ADD_PHOTO} />
      {/* <Route path={ROUTES.POST_DETAILS} component></Route> */}
      <Route path={ROUTES.PROFILE} component={Profile} />
    </Switch>
  ) : (
    <Switch>
      <Redirect to={ROUTES.LOGIN} />
    </Switch>
  );
}

export default AppRouter;
