import { useState } from "react";
import { Link } from "react-router-dom";
import AddComment from "./Add-comment";
import shortid from "shortid";
import styles from "./Post.module.scss";

export default function Comments({
  userId,
  postId,
  userName,
  comments: allComments,
  posted,
  commentInput,
  currentUserName,
}) {
  const [comments, setComments] = useState(allComments);
  const [commentsSlice, setCommentsSlice] = useState(3);

  const showNextComments = () => {
    setCommentsSlice(commentsSlice + 3);
  };

  return (
    <>
      <div className={styles.commentsContainer}>
        {comments.slice(-commentsSlice).map((item) => (
          <p key={shortid.generate()}>
            <Link to={`/p/${item.userName}`}>
              <span className={styles.commentUserName}>{item.userName}</span>
            </Link>
            <span className={styles.commentText}> {item.text}</span>
          </p>
        ))}
        {comments.length >= 3 && commentsSlice < comments.length && (
          <button
            className={styles.moreCommentButton}
            type="button"
            onClick={showNextComments}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                showNextComments();
              }
            }}
          >
            View more comments
          </button>
        )}
      </div>
      <AddComment
        userId={userId}
        postId={postId}
        userName={userName}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
        currentUserName={currentUserName}
      />
    </>
  );
}
