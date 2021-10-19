import axios from "axios";
const gamesApi = axios.create({
  baseURL: "https://brads-nc-games.herokuapp.com/api",
});

export const getCategories = async () => {
  const { data } = await gamesApi.get("/categories");
  return data.categories;
};

export const getReviews = async (categorySlug) => {
  let path = "/reviews";
  if (categorySlug) path += `?category=${categorySlug}`;
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
