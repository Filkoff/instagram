import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { BASE_URL, DEFAULT_IMAGE_PATH } from "../../constants/paths";
import { useDispatch, useSelector } from "react-redux";
import { deleteAvatar, followUser, uploadAvatar } from "../../actions/user";
import MyModalWindow from "../MyModal/MyModalWindow";
import styles from "./Profile.module.css";

export default function Header({ photosCount, profile }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = user.currentUser._id;
  const isFollow = user.foll.forEach((element) => {
    if (element._id === profile._id) {
      return true;
    } else {
      return false;
    }
  });

  const [isFollowingProfile, setIsFollowingProfile] = useState(isFollow);
  const activeBtnFollow =
    user?.currentUser.name && user?.currentUser.name !== profile.name;

  const handleToggleFollow = async () => {
    setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
    followUser(user.currentUser._id, profile._id);
  };

  const inputHandler = (e) => {
    const file = e.target.files[0];
    dispatch(uploadAvatar(userId, file));
    setIsModalOpen(false);
  };
  const deleteAvatarHandler = (userId) => {
    dispatch(deleteAvatar(userId));
    setIsModalOpen(false);
  };

  return (
    <div className={styles.profileHeaderContainer}>
      <div>
        {
          profile._id === user.currentUser._id ? (
            <img
              onClick={() => setIsModalOpen(true)}
              className={styles.profileAvatar}
              alt={profile.name}
              src={`${BASE_URL}/${user.currentUser.avatar}`}
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE_PATH;
              }}
            />
          ) : (
            <img
              className={styles.profileAvatar}
              alt={profile.name}
              src={`${BASE_URL}/${profile.avatar}`}
              onError={(e) => {
                e.target.src = DEFAULT_IMAGE_PATH;
              }}
            />
          )
          /* ) : (
          <Skeleton circle height={150} width={150} count={1} />
        )} */
        }
      </div>
      <div className={styles.profileHeaderInfo}>
        <div className={styles.nameButtonContainer}>
          <p className={styles.profileName}>{profile.name}</p>
          {activeBtnFollow && isFollowingProfile === null ? (
            <Skeleton count={1} width={80} height={32} />
          ) : (
            activeBtnFollow && (
              <button
                className={styles.followButton}
                type="button"
                onClick={handleToggleFollow}
              >
                {isFollowingProfile ? "Unfollow" : "Follow"}
              </button>
            )
          )}
        </div>
        <div className={styles.profileInfo}>
          {
            // !profile.followed.length ? (
            // profile.followed.length < 1 ? (
            //   <Skeleton count={1} width={677} height={24} />
            // ) : (
            <div className={styles.flexContainer}>
              <p>
                <span className={styles.infoCount}>{photosCount}</span> photos
              </p>
              <p>
                <span className={styles.infoCount}>
                  {profile.followers.length}
                </span>
                {profile.followed.length === 1 ? ` follower` : ` followers`}
              </p>
              <p>
                <span className={styles.infoCount}>
                  {profile.followed?.length}
                </span>
                following
              </p>
            </div>
            // )
          }
        </div>
        <div>
          <p className={styles.profileFullName}>
            {!profile.name ? (
              <Skeleton count={1} height={24} />
            ) : (
              `${profile.name} ${profile.surname}`
            )}
          </p>
        </div>
      </div>
      <MyModalWindow show={isModalOpen} setShow={setIsModalOpen}>
        <div className={styles.modalAvatarContainer}>
          <div className={styles.modalHeader}>Change profile photo</div>
          <div className={styles.inputPhoto}>
            <input
              id="file"
              onInput={(e) => {
                inputHandler(e);
              }}
              name="image"
              className={styles.btnLoadInput}
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              placeholder="Load picture"
            />
          </div>
          <div
            className={styles.deleteAvatar}
            onClick={() => deleteAvatarHandler(userId)}
          >
            Remove Current Photo
          </div>
          <div
            className={styles.cancelModal}
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </div>
        </div>
      </MyModalWindow>
    </div>
  );
}
