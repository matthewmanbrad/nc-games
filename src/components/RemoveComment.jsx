import React from "react";
import { useState } from "react";
import { deleteComment } from "../utils/api";

const RemoveComment = ({ comment_id, comments, setComments }) => {
  const [isError, setIsError] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const handleDelete = (comment_id) => {
    setIsError(false);
    setDeleted(false);
    deleteComment(comment_id)
      .then(() => {
        const newComments = [];
        for (let i = 0; i < comments.length; i++) {
          if (comments[i].comment_id !== comment_id) {
            newComments.push(comments[i]);
          }
        }
        setComments(newComments);
        setDeleted(true);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  return (
    <div>
      <button
        className="RemoveComment__button"
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
