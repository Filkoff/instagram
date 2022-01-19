import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "../components/styled-components/Button";
import Input from "../components/styled-components/Input";
import * as ROUTES from "../constants/routes";
import { registration } from "../actions/user";
import styles from "./SignUp.module.css";
import Flex from "../components/styled-components/Flex";

export default function SignUp() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";

  const handleSignUp = async (event) => {
    event.preventDefault();
    const usernameExists = false;

    if (!usernameExists) {
      try {
        registration(name, surname, email, password);
        history.push(ROUTES.LOGIN);
      } catch (error) {
        setName("");
        setSurname("");
        setEmail("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setName("");
      setError("That username is already taken, please try another.");
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
          <h1>
            <img src="/images/logo.png" alt="Instagram" />
          </h1>

          {error && <p>{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <div>
              <Input
                aria-label="Enter your name"
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              <Input
                aria-label="Enter your surname"
                type="text"
                placeholder="Surname"
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
              />
            </div>
            <div>
              <Input
                aria-label="Enter your email address"
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div>
              <Input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <Button disabled={isInvalid} type="submit">
              Sign Up
            </Button>
          </form>
        </div>
        <div>
          <p>
            Have an account?
            <Link to={ROUTES.LOGIN} className={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </Flex>
    </Flex>
  );
}
