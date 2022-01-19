import axios from "axios";
import { BASE_URL } from "../constants/paths";

export const like = async (currentUserId, postId) => {
  try {
    const response = await axios.post(
      BASE_URL + "/posts/like",
      {
        currentUserId,
        postId,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response;
  } catch (e) {
    console.error(e.response.data.message);
  }
};

export const addComment = async (userName, userId, text, postId) => {
  try {
    const response = await axios.post(
      BASE_URL + "/posts/comment",
      {
        userName,
        userId,
        text,
        postId,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    return response;
  } catch (e) {
    console.error(e.response.data.message);
  }
};

export const getPost = async (postId) => {
  try {
    const response = await axios.get(BASE_URL + `/posts/${postId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response;
  } catch (e) {
    console.error(e.response.data.message);
  }
};

export const addPost = async (userName, text, userId, picture) => {
  try {
    const formData = new FormData();
    formData.set("userName", userName);
    formData.set("text", text);
    formData.set("userId", userId);
    formData.set("picture", picture);
    await axios.post(BASE_URL + "/posts", formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (e) {
    console.error(e.response.data.message);
  }
};
