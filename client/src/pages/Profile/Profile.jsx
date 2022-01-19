import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import * as ROUTES from "../../constants/routes";
import UserProfile from "../../components/Profile/Index";
import Header from "../../components/Header/Header";
import { checkUser } from "../../actions/user";
import { useDispatch } from "react-redux";
import { setVisitedUser } from "../../reducers/userReducer";

export default function Profile() {
  const { username } = useParams();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    async function checkUserExists() {
      const result = await checkUser(username);
      if (result?._id) {
        setUser(result);
        dispatch(setVisitedUser(result));
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
      return result;
    }

    checkUserExists();
  }, [username, history]);

  return user?.name ? (
    <div>
      <Header />
      <div>
        <UserProfile profileUser={user} />
      </div>
    </div>
  ) : null;
}
