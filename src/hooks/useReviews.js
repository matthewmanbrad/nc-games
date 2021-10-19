import { useState, useEffect } from "react";
import { getReviews } from "../utils/api";

const useReviews = (categorySlug) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setErr(null);
    getReviews(categorySlug)
      .then((reviewsFromApi) => {
        setReviews(reviewsFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 404) {
          setErr("category not found");
        } else {
          setErr("something went wrong...");
        }
      });
  }, [categorySlug]);
  return { reviews, loading, err };
};

export default useReviews;
