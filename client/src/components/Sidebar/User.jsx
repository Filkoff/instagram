import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { BASE_URL, DEFAULT_IMAGE_PATH } from "../../constants/paths";
import styles from "./Sidebar.module.scss";

export default function User({ user }) {
  return !user.name || !user.surname ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${user.name}`} className={styles.userInfo}>
      <div className={styles.userContainer}>
        <div className={styles.imageContainer}>
          <img
            className={styles.avatar}
            src={`${BASE_URL}/${user.avatar}`}
            alt="avatar"
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
        </div>
        <div>
          <p>{user.name + " " + user.surname}</p>
        </div>
      </div>
    </Link>
  );
}
