import axios from "axios";
const gamesApi = axios.create({
  baseURL: "https://brads-nc-games.herokuapp.com/api",
});

export const getCategories = async () => {
  const { data } = await gamesApi.get("/categories");
  return data.categories;
};

export const getReviews = async (categorySlug, sortBy) => {
  let path = "/reviews";
  if (categorySlug && !sortBy) path += `?category=${categorySlug}`;
  if (sortBy && !categorySlug) path += `?${sortBy}`;
  if (sortBy && categorySlug) path += `?category=${categorySlug}&${sortBy}`;
  const { data } = await gamesApi.get(path);
  return data.reviews;
};

export const getSingleReview = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}`);
  return data.review;
};

export const getReviewComments = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}/comments`);
  return data.comments;
};

export const patchReviewVotes = async (review_id, num) => {
  const { data } = await gamesApi.patch(`/reviews/${review_id}`, {
    inc_votes: num,
  });
  return data.review;
};

export const patchCommentVotes = async (comment_id, num) => {
  const { data } = await gamesApi.patch(`/comments/${comment_id}`, {
    inc_votes: num,
  });
  return data.comment;
};

export const getUsers = async () => {
  const { data } = await gamesApi.get("/users");
  return data.users;
};

export const getUserInfo = async (username) => {
  const { data } = await gamesApi.get(`/users/${username}`);
  return data.user;
};

export const postComment = async (review_id, username, body) => {
  const { data } = await gamesApi.post(`reviews/${review_id}/comments`, {
    username: username,
    body: body,
  });
  return data.comment;
};

export const deleteComment = async (comment_id) => {
  await gamesApi.delete(`comments/${comment_id}`);
};
