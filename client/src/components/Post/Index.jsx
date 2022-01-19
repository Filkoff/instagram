import { useRef } from "react";
import Header from "./Header";
import Image from "./Image";
import Actions from "./Actions";
import Footer from "./Footer";
import Comments from "./Comments";
import styles from "./Post.module.scss";

export default function Post({ data, userId, currentUserName }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();

  return (
    <div className={styles.post}>
      <Header userName={data.userName} />
      <Image src={data.picture} caption={data.text} />
      <div className={styles.footer}>
        <Actions
          userId={userId}
          postId={data._id}
          totalLikes={data.likes.length}
          likesArr={data.likes}
          handleFocus={handleFocus}
        />
        <Footer caption={data.caption} username={data.username} />
        <Comments
          userId={userId}
          postId={data._id}
          userName={data.userName}
          comments={data.comments}
          posted={data.date}
          commentInput={commentInput}
          currentUserName={currentUserName}
        />
      </div>
    </div>
  );
}
