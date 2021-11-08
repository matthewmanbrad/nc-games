import React from "react";
import { useState } from "react";
import { patchReviewVotes } from "../../utils/api";

const AlterReviewVotes = ({ review_id, votes }) => {
  const [votesChange, setVotesChange] = useState(0);
  const [isError, setIsError] = useState(false);
  const [hasVotedMinus, setHasVotedMinus] = useState(false);
  const [hasVotedPlus, setHasVotedPlus] = useState(false);

  const handleVote = (num) => {
    setIsError(false);
    setVotesChange((currVotesChange) => currVotesChange + num);
    patchReviewVotes(review_id, num).catch(() => {
      setIsError(true);
      setVotesChange((currVotesChange) => currVotesChange - num);
    });
  };

  const resetButtons = () => {
    setHasVotedMinus(false);
    setHasVotedPlus(false);
  };

  return (
    <>
      <h2 className="SingleReview--amount-of-votes">
        Votes: {votes + votesChange}
      </h2>
      <span>
        {!hasVotedPlus ? (
          <button
            className="voting__button--plus"
            onClick={() => {
              handleVote(1);
              setHasVotedPlus(!hasVotedPlus);
            }}
          >
            +
          </button>
        ) : (
          <button disabled className="voting__button--plus-clicked">
            +
          </button>
        )}

        {!hasVotedMinus ? (
          <button
            className="voting__button--minus"
            onClick={() => {
              handleVote(-1);
              setHasVotedMinus(!hasVotedMinus);
            }}
          >
            +
          </button>
        ) : (
          <button className="voting__button--minus-clicked" disabled>
            +
          </button>
        )}
      </span>
      {hasVotedPlus && hasVotedMinus && resetButtons()}
      {isError && <p>Something went wrong!</p>}
    </>
  );
};

export default AlterReviewVotes;
