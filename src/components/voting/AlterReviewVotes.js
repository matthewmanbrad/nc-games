import React from "react";
import { useState } from "react";
import { patchReviewVotes } from "../../utils/api";

const AlterReviewVotes = ({ review_id, votes }) => {
  const [votesChange, setVotesChange] = useState(0);
  const [isError, setIsError] = useState(false);

  const handleVote = (num) => {
    setIsError(false);
    setVotesChange((currVotesChange) => currVotesChange + num);
    patchReviewVotes(review_id, num).catch(() => {
      setIsError(true);
      setVotesChange((currVotesChange) => currVotesChange - num);
    });
  };

  return (
    <>
      <h2 className="SingleReview--amount-of-votes">
        Votes: {votes + votesChange}
      </h2>
      <span>
        <button className="voting__button" onClick={() => handleVote(1)}>
          +
        </button>
        <button className="voting__button" onClick={() => handleVote(-1)}>
          -
        </button>
      </span>
    </>
  );
};

export default AlterReviewVotes;
