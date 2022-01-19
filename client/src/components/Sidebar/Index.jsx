import { useState, useEffect } from "react";
import User from "./User";
import Skeleton from "react-loading-skeleton";
import Suggestions from "./Suggestions";
import { useDispatch, useSelector } from "react-redux";
import { getRecommendedUsers } from "../../actions/user";
import styles from "./Sidebar.module.scss";

export default function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const recommended = useSelector((state) => state.user.recommended);

  useEffect(() => {
    dispatch(getRecommendedUsers(user.currentUser._id));
  }, [user.currentUser._id]);

  useEffect(() => {
    setIsLoading(false);
  }, [recommended]);

  return (
    <div className={styles.container}>
      <User user={user.currentUser} />
      {isLoading ? (
        <Skeleton
          className={styles.skeleton}
          count={5}
          width={100}
          height={30}
        />
      ) : (
        <Suggestions
          currentUserId={user.currentUser._id}
          followed={user.currentUser.followed}
        />
      )}
    </div>
  );
}
