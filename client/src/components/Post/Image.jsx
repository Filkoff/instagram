import { BASE_URL } from "../../constants/paths";
import styles from "./Post.module.scss";

export default function Image({ src, caption }) {
  return (
    <img className={styles.image} src={`${BASE_URL}/${src}`} alt={caption} />
  );
}
