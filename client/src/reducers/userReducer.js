const SET_USER = "SET_USER";
const SET_RECOMMENDATIONS = "SET_RECOMMENDATIONS";
const LOGOUT = "LOGOUT";
const SET_FOLLOWED = "SET_FOLLOWED";
const SET_VISITED_USER = "SET_VISITED_USER";
const SET_VISITED_FOLLOWED = "SET_VISITED_FOLLOWED";

const defaultState = {
  currentUser: {},
  isAuth: false,
  recommended: [],
  foll: [],
  visitedUser: {},
};

export default function userReducer(state = defaultState, { type, payload }) {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        currentUser: { ...payload },
        isAuth: true,
      };

    case SET_RECOMMENDATIONS:
      const recommended = payload.filter(
        (user) => user._id !== state.currentUser._id
      );
      return {
        ...state,
        recommended: recommended,
      };

    case SET_FOLLOWED:
      return {
        ...state,
        foll: payload,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: {},
        isAuth: false,
      };

    case SET_VISITED_USER:
      return {
        ...state,
        visitedUser: { ...state.visitedUser, ...payload },
      };

    default:
      return state;
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });

export const setRecommended = (users) => ({
  type: SET_RECOMMENDATIONS,
  payload: users,
});

export const setFollowed = (users) => ({
  type: SET_FOLLOWED,
  payload: users,
});

export const setVisitedFollowedUser = (users) => ({
  type: SET_VISITED_FOLLOWED,
  payload: users,
});

export const logOut = () => ({ type: LOGOUT });

export const setVisitedUser = (user) => ({
  type: SET_VISITED_USER,
  payload: user,
});
