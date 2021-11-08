import { useState, useEffect } from "react";
import { getReviews } from "../utils/api";

const useReviews = (categorySlug, sortBy, pageNumber) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    setLoading(true);
    setErr(null);
    getReviews(categorySlug, sortBy, pageNumber)
      .then((reviewsFromApi) => {
        console.log(reviewsFromApi);
        setReviews(reviewsFromApi);
        setLoading(false);
      })
      .catch((err) => {
        console.dir(err);
        setLoading(false);
        if (err.status === 404) {
          setErr("category not found");
        } else {
          setErr("something went wrong...");
        }
      });
  }, [pageNumber, sortBy, categorySlug]);
  return { pageNumber, reviews, loading, err };
};

export default useReviews;
