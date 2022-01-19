import { Link } from "react-router-dom";
import Avatar from "../styled-components/Avatar";
import Flex from "../styled-components/Flex";
import styles from "./Post.module.scss";

export default function Header({ userName }) {
  return (
    <div className={styles.header}>
      <Link to={`/p/${userName}`} className={styles.userLink}>
        <Flex align="center">
          <Avatar
            size="32px"
            src={`/images/avatars/${userName}.jpg`}
            onError={(e) => {
              e.target.src = `/images/avatars/default.png`;
            }}
          />
          <p>{userName}</p>
        </Flex>
      </Link>
    </div>
  );
}
