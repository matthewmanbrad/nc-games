import React from "react";
import { useState } from "react";
import { patchCommentVotes } from "../../utils/api";

const AlterCommentVotes = ({ comment_id, votes }) => {
  const [votesChange, setVotesChange] = useState(0);
  const [isError, setIsError] = useState(false);

  const handleVote = (num) => {
    setIsError(false);
    setVotesChange((currVotesChange) => currVotesChange + num);
    patchCommentVotes(comment_id, num).catch(() => {
      setIsError(true);
      setVotesChange((currVotesChange) => currVotesChange - num);
    });
  };

  return (
    <>
      <h2 className="SingleReviewComments--amount-of-votes">
        Votes: {votes + votesChange}
      </h2>
      <span>
        <button className="voting__button--plus" onClick={() => handleVote(1)}>
          +
        </button>
        <button
          className="voting__button--minus"
          onClick={() => handleVote(-1)}
        >
          -
        </button>
      </span>
    </>
  );
};

export default AlterCommentVotes;
