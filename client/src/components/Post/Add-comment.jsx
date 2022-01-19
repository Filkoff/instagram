import { useState } from "react";
import { addComment } from "../../actions/post";
import styles from "./Post.module.css";

export default function AddComment({
  comments,
  setComments,
  commentInput,
  userId,
  postId,
  userName,
  currentUserName,
}) {
  const [comment, setComment] = useState("");

  const handleSubmitComment = (event) => {
    event.preventDefault();
    addComment(currentUserName, userId, comment, postId);
    setComments([
      ...comments,
      { userName: currentUserName, userId, text: comment, postId },
    ]);
    setComment("");
  };

  return (
    <div className={styles.formContainer}>
      <form
        className={styles.commentForm}
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className={styles.commentInput}
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          ref={commentInput}
        />

        <button
          className={styles.commentButton}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}
