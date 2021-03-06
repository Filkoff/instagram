import { useState } from "react";
import { like } from "../../actions/post";
import styles from "./Post.module.scss";

export default function Actions({
  totalLikes,
  postId,
  userId,
  likesArr,
  handleFocus,
}) {
  let toggled = likesArr.includes(userId) ? true : false;
  const [toggleLiked, setToggleLiked] = useState(toggled);
  const [likesCount, setLikesCount] = useState(totalLikes);

  const handleToggleLiked = async () => {
    like(userId, postId);
  };

  return (
    <>
      <div className={styles.actionsContainer}>
        <svg
          className={styles.icon}
          onClick={() => {
            if (toggleLiked) {
              setLikesCount(likesCount - 1);
            } else {
              setLikesCount(likesCount + 1);
            }
            handleToggleLiked();
            setToggleLiked(!toggleLiked);
          }}
          xmlns="http://www.w3.org/2000/svg"
          fill={toggleLiked ? "red" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          tabIndex={0}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <svg
          className={styles.icon}
          onClick={handleFocus}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          tabIndex={0}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <div className={styles.likes}>
        <p className={styles.likesCount}>
          {likesCount === 1 ? `${likesCount} like` : `${likesCount} likes`}
        </p>
      </div>
    </>
  );
}
