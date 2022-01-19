import { useState } from "react";
import { BASE_URL } from "../../constants/paths";
import MyModalWindow from "../MyModal/MyModalWindow";
import User from "../Sidebar/User";
import styles from "./Profile.module.css";

export default function Photos({ photos, user }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoInformation, setPhotoInformation] = useState(null);

  return (
    <div className={styles.postFieldConatainer}>
      <div className={styles.postField}>
        {photos.map((photo) => (
          <div
            key={photo._id}
            className={styles.postPreview}
            onClick={() => {
              setIsModalOpen(true);
              setPhotoInformation(photo);
            }}
          >
            <img
              className={styles.postSmallImage}
              src={`${BASE_URL}/${photo.picture}`}
              alt={photo._id}
            />

            <div className={styles.postHoverinfo}>
              <p className={styles.iconCount}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={styles.icon}
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
                {photo.likes.length}
              </p>

              <p className={styles.iconCount}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={styles.icon}
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                    clipRule="evenodd"
                  />
                </svg>
                {photo.comments.length}
              </p>
            </div>
          </div>
        ))}
      </div>

      <MyModalWindow show={isModalOpen} setShow={setIsModalOpen}>
        <div className={styles.modalContainer}>
          <div className={styles.imageContainer}>
            <img
              className={styles.postImage}
              src={`${BASE_URL}/${photoInformation?.picture}`}
              alt={photoInformation?._id}
            />
          </div>
          <div className={styles.postRigth}>
            <User user={user} />
            <div className={styles.commentsContainer}>
              {photoInformation?.text.length ? (
                <div className={styles.personalComment}>
                  <User user={user} />
                  <span className={styles.textComment}>
                    {photoInformation?.text}
                  </span>
                </div>
              ) : null}
              {photoInformation?.comments?.map((comment) => (
                <p className={styles.comment}>
                  <span className={styles.commentName}>{comment.userName}</span>
                  <span className={styles.commentText}>{comment.text}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </MyModalWindow>
      {!photos ||
        (photos.length === 0 && (
          <p className={styles.noPostLabel}>No Posts Yet</p>
        ))}
    </div>
  );
}
