import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { auth } from "./actions/user";

const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const NotFound = lazy(() => import("./pages/ErrorPage/ErrorPage"));
const AppContainer = styled.div`
width: 100%;
min-height: 100vh;
padding 2rem;
font-family: 'Roboto', sans-serif;
max-width: 975px;
margin: 0 auto;
`;

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <AppContainer>
      <div>
        <BrowserRouter>
          <Suspense fallback={<div>...loading</div>}>
            <Switch>
              <Route path={ROUTES.LOGIN} component={Login} />
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
              <Route path={ROUTES.PROFILE} component={Profile} />
              <Route path={ROUTES.DASHBOARD} component={Dashboard} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </BrowserRouter>
      </div>
    </AppContainer>
  );
}

export default App;
