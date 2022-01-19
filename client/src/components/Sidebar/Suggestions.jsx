import Skeleton from "react-loading-skeleton";
import SuggestedProfile from "./SuggestedProfile";
import { useSelector } from "react-redux";

export default function Suggestions({ currentUserId, followed }) {
  const recommended = useSelector((state) => state.user.recommended);

  return !recommended ? (
    <Skeleton count={1} height={150} />
  ) : recommended.length > 0 ? (
    <div>
      <div>
        <p>Suggestions for you</p>
      </div>
      <div>
        {recommended.slice(0, 100).map((profile) => (
          <SuggestedProfile
            key={profile._id}
            avatar={profile.avatar}
            currentUserId={currentUserId}
            username={profile.name}
            profileId={profile._id}
            followed={followed}
          />
        ))}
      </div>
    </div>
  ) : null;
}
