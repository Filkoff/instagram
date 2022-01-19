import { useState } from "react";
import { Link } from "react-router-dom";
import { followUser } from "../../actions/user";
import Flex from "../styled-components/Flex";
import Avatar from "../styled-components/Avatar";
import { BASE_URL } from "../../constants/paths";
import styles from "./Sidebar.module.scss";

export default function SuggestedProfile({
  username,
  profileId,
  currentUserId,
  followed,
  avatar,
}) {
  const [isFollow, setIsFollow] = useState(followed?.includes(profileId));

  async function handleFollowUser() {
    followUser(currentUserId, profileId);
    setIsFollow(!isFollow);
  }

  return (
    <Flex align="center">
      <div className={styles.suggestedContainer}>
        <div className={styles.userContainer}>
          <Avatar
            size="32px"
            src={`${BASE_URL}/${avatar}`}
            onError={(e) => {
              e.target.src = "/images/avatars/default.png";
            }}
          />
          <Link to={`/p/${username}`}>
            <p className="font-bold text-sm">{username}</p>
          </Link>
        </div>
        <div>
          <button
            className={styles.commentButton}
            type="button"
            onClick={handleFollowUser}
          >
            {isFollow ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </Flex>
  );
}
