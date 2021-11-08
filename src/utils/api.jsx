import axios from "axios";
const gamesApi = axios.create({
  baseURL: "https://brads-nc-games.herokuapp.com/api",
});

export const getCategories = async () => {
  const { data } = await gamesApi.get("/categories");
  return data.categories;
};

export const getReviews = async (categorySlug, sortBy, pageNumber) => {
  let path = "/reviews";
  const extraQueries = [];
  if (categorySlug) extraQueries.push(`category=${categorySlug}`);
  if (sortBy) extraQueries.push(`sort_by=${sortBy}`);
  if (pageNumber) extraQueries.push(`p=${pageNumber}`);
  if (categorySlug || sortBy || pageNumber) {
    path += `?${extraQueries.join("&")}`;
  }

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
  console.log(data.user);
  return data.user;
};

export const postComment = async (review_id, user, comment) => {
  const { data } = await gamesApi.post(`/reviews/${review_id}/comments`, {
    username: user,
    body: comment,
  });
  return data.comment;
};

export const deleteComment = async (comment_id) => {
  await gamesApi.delete(`/comments/${comment_id}`);
};

export const postReview = async (review) => {
  const { data } = await gamesApi.post("/reviews", review);
  console.log(review);
  return data.review;
};
