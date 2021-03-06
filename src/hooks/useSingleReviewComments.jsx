import { useEffect, useState } from "react";
import { getReviewComments } from "../utils/api";

const useSingleReviewComments = (review_id) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  useEffect(() => {
    setLoading(true);
    setErr(null);
    getReviewComments(review_id)
      .then((commentsFromApi) => {
        setComments(commentsFromApi);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response && err.response.status === 404) {
          setErr("review not found");
        } else {
          setErr("something went wrong...");
        }
      });
  }, [review_id]);
  return { comments, loading, err, setComments };
};

export default useSingleReviewComments;
