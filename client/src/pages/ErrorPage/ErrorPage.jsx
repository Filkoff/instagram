import Header from "../../components/Header/Header";
import styles from "./ErrorPage.module.scss";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.info}>
        <p className={styles.status}>404 Not Found!</p>
      </div>
    </div>
  );
}
