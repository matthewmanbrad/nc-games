import { useState } from "react";
import { getSingleReview } from "../utils/api";

const useDislikeCount = () => {
  const [dislikeCount, setDislikeCount] = useState(0);
  const incDislikeCount = () => setDislikeCount((currCount) => currCount + 1);
  return { dislikeCount, incDislikeCount };
};

export default useDislikeCount;
