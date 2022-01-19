import axios from "axios";

import { BASE_URL } from "../constants/paths";
import { setFollowed, setRecommended, setUser } from "../reducers/userReducer";

export const registration = async (name, surname, email, password) => {
  try {
    await axios.post(BASE_URL + "/auth/registration", {
      name,
      surname,
      email,
      password,
    });
    return { success: true };
  } catch (e) {
    return { success: false, data: e.response.data.message };
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(BASE_URL + "/auth/login", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);

    return { isAuth: true, data: response.data.user };
  } catch (e) {
    return { isAuth: false, data: e.response.data.message };
  }
};

export const getRecommendedUsers = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(BASE_URL + `/user/recommended/${id}`);
      dispatch(setRecommended(response.data));
    } catch (e) {
      console.error(e.response.data.message);
    }
  };
};

export const followUser = async (currentUserId, id) => {
  try {
    await axios.post(
      BASE_URL + "/user/follow",
      {
        currentUserId,
        id,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  } catch (e) {
    console.error(e.response.data.message);
  }
};

export const setFollowedUsers = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(BASE_URL + `/user/followedUsers/${id}`);
      if (response) dispatch(setFollowed(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const auth = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(BASE_URL + "/auth/auth", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      await dispatch(setUser(response.data));
    } catch (e) {
      console.error(e.message);
      localStorage.removeItem("token");
    }
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(BASE_URL + `/user/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      dispatch(setUser(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const checkUser = async (userName) => {
  try {
    const response = await axios.get(BASE_URL + `/user/check/${userName}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
  } catch (e) {
    console.error(e.message);
  }
};

export const uploadAvatar = (id, file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.set("picture", file);
      formData.set("_id", id);
      const response = await axios.post(BASE_URL + "/user/avatar", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      dispatch(setUser(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const deleteAvatar = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(BASE_URL + `/user/avatar/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      dispatch(setUser(response.data));
    } catch (e) {
      console.error(e.message);
    }
  };
};

export const searchUser = async (query) => {
  try {
    const response = await axios.get(BASE_URL + `/user/search?query=${query}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  } catch (e) {
    console.error(e.message);
  }
};
