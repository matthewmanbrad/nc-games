import axios from "axios";
const gamesApi = axios.create({
  baseURL: "https://brads-nc-games.herokuapp.com/api",
});

export const getCategories = async () => {
  const { data } = await gamesApi.get("/categories");
  console.log(data.categories);
  return data.categories;
};
