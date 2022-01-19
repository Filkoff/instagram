import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHistory, Link } from "react-router-dom";
import { login, setFollowedUsers } from "../actions/user";
import Button from "../components/styled-components/Button";
import ErrorMessage from "../components/styled-components/ErrorMessage";
import Flex from "../components/styled-components/Flex";
import Input from "../components/styled-components/Input";
import * as ROUTES from "../constants/routes";
import { setUser } from "../reducers/userReducer";
import styles from "./Login.module.css";

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.isAuth) {
      dispatch(setUser(response.data));
      dispatch(setFollowedUsers(user.currentUser._id));
      history.push(ROUTES.DASHBOARD);
    } else {
      response.then((message) => setError(message.data));
    }
  };

  return (
    <Flex align="center" justify="center">
      <div>
        <img
          className={styles.image}
          src="/images/iphone-with-profile.jpg"
          alt="Phone"
        />
      </div>

      <Flex direction="column" align="center">
        <div>
          <div>
            <h1>
              <img src="/images/logo.png" alt="Instagram" />
            </h1>
          </div>
        </div>

        <div>Hello!</div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <form onSubmit={handleLogin} method="POST">
          <div>
            <Input
              placeholder="email"
              aria-label="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Input
              aria-label="Enter your password"
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Button type="submit">Log in</Button>
          <div>
            <p>Don't have an account?</p> <Link to="/signUp">Sign up</Link>
          </div>
        </form>
      </Flex>
    </Flex>
  );
}

export default Login;
