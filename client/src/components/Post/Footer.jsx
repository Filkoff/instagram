import styles from "./Post.module.scss";

export default function Footer({ caption, username }) {
  return (
    <div className={styles.comments}>
      <span className={styles.footerUsername}>{username}</span>
      <span className={styles.footerCaption}>{caption}</span>
    </div>
  );
}
