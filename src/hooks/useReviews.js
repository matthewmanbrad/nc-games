import { useState, useEffect } from "react";
import { getReviews } from "../utils/api";

const useReviews = (categorySlug, sortBy) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  console.log(sortBy, "in hook");
  useEffect(() => {
    setLoading(true);
    setErr(null);
    getReviews(categorySlug, sortBy)
      .then((reviewsFromApi) => {
        setReviews(reviewsFromApi);
        setLoading(false);
      })
      .catch((err) => {
        console.dir(err);
        setLoading(false);
        if (err.response.status === 404) {
          setErr("category not found");
        } else {
          setErr("something went wrong...");
        }
      });
  }, [categorySlug, sortBy]);
  return { reviews, loading, err };
};

export default useReviews;
