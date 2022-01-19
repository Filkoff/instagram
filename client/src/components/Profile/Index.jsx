import Header from "./Header";
import Photos from "./Photos";

export default function Profile({ profileUser }) {
  const posts = profileUser.posts;

  return (
    <>
      <Header photosCount={posts.length} profile={profileUser} />
      <Photos photos={posts} user={profileUser} />
    </>
  );
}
