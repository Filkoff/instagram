import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { setFollowedUsers } from "../../actions/user";
import Post from "../Post/Index";
import "react-loading-skeleton/dist/skeleton.css";
import shortid from "shortid";
import styles from "./Timeline.module.css";

export default function Timeline() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setFollowedUsers(user.currentUser._id));
  }, [user.currentUser._id]);

  let posts = [];
  user.foll.forEach((user) => {
    posts = [...posts, ...user.posts];
  });

  return (
    <div className={styles.container}>
      {posts?.length === 0 ? (
        <Skeleton
          className={styles.skeleton}
          count={3}
          width={600}
          height={610}
        />
      ) : posts?.length > 0 ? (
        posts.map((content) => (
          <Post
            key={shortid.generate()}
            userId={user.currentUser._id}
            currentUserName={user.currentUser.name}
            data={content}
          />
        ))
      ) : (
        <p className={styles.noPostText}>Follow other people to see Photos</p>
      )}
    </div>
  );
}
