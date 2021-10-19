import { useState } from "react";
import { getSingleReview } from "../utils/api";

const useLikeCount = () => {
  const [likeCount, setLikeCount] = useState(0);
  const incLikeCount = () => setLikeCount((currCount) => currCount + 1);
  return { likeCount, incLikeCount };
};

export default useLikeCount;
