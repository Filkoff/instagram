import { Link, useHistory } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import { BASE_URL, DEFAULT_IMAGE_PATH } from "../../constants/paths";
import { useDispatch, useSelector } from "react-redux";
import Flex from "../styled-components/Flex";
import styles from "./Header.module.css";
import { logOut } from "../../reducers/userReducer";
import { useState } from "react";
import Search from "../Search/Search";
import ImageEditModal from "../ImageEditModal/ImageEditModal";

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOut());
    history.push(ROUTES.LOGIN);
  };

  return (
    <header className={styles.headerContainer}>
      <Flex justify="space-between">
        <div>
          <h1>
            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
              <img
                src="/images/logo.png"
                alt="Instagram"
                className={styles.img}
              />
            </Link>
          </h1>
        </div>
        <div>
          <Search />
        </div>
        <div>
          {user.isAuth ? (
            <>
              <Link to={ROUTES.ADD_PHOTO} aria-label="Dashboard">
                <svg
                  onClick={() => setIsModalOpen(true)}
                  className={styles.icons}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
              <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                <svg
                  className={styles.icons}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>

              <svg
                onClick={() => logOutHandler()}
                className={styles.icons}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              {user && (
                <div className={styles.avatarContainer}>
                  <Link to={`/p/${user?.currentUser.name}`}>
                    <img
                      className={styles.avatar}
                      src={`${BASE_URL}/${user.currentUser.avatar}`}
                      alt={`${user?.currentUser.name} profile`}
                      onError={(e) => {
                        e.target.src = DEFAULT_IMAGE_PATH;
                      }}
                    />
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN}>
                <button type="button" className={styles.authButton}>
                  Log In
                </button>
              </Link>
              <Link to={ROUTES.SIGN_UP}>
                <button type="button" className={styles.authButton}>
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
        <ImageEditModal
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          user={user}
        />
      </Flex>
    </header>
  );
}
