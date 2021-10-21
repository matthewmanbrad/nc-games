import { useState, useEffect } from "react";
import { getSingleReview } from "../utils/api";

const useSingleReview = (review_id) => {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    setLoading(true);
    setErr(null);
    getSingleReview(review_id)
      .then((reviewFromApi) => {
        setReview(reviewFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        if (err.response && err.response.status === 404) {
          setErr("review not found");
        } else {
          setErr("something went wrong...");
        }
      });
  }, [review_id]);
  return { review, loading, err };
};

export default useSingleReview;
