import React from "react";
import { useState } from "react";
import { deleteComment } from "../utils/api";

const RemoveComment = ({ comment_id }) => {
  const [isError, setIsError] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = (comment_id) => {
    setIsError(false);
    setDeleted(false);
    deleteComment(comment_id)
      .then(() => {
        setDeleted(true);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <div>
      <button
        onClick={() => {
          handleDelete(comment_id);
        }}
      >
        Delete Comment!
      </button>
      {isError && <h2>Unable to delete comment!</h2>}
      {deleted && <h2>Comment deleted!</h2>}
    </div>
  );
};

export default RemoveComment;
