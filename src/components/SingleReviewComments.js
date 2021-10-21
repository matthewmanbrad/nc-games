import React from "react";
import { Link, useParams } from "react-router-dom";
import useSingleReviewComments from "../hooks/useSingleReviewComments";
import AlterCommentVotes from "./voting/alterCommentVotes";

const SingleReviewComments = ({ review_id }) => {
  const { comments, loading, err } = useSingleReviewComments(review_id);
  if (loading) {
    return <h3>LOADING...</h3>;
  }
  if (err) {
    return <p>{err}</p>;
  }
  return (
    <section>
      {comments === [] ? (
        <h3 className="SingleReviewComments__h3--no-comments-message">
          No Comments To Show!
        </h3>
      ) : (
        comments.map((comment) => {
          return (
            <section className="SingleReview__comments-section">
              <h3 className="singleReviewComments__section--author">
                {comment.author}
              </h3>
              <p>{comment.body}</p>
              <AlterCommentVotes
                comment_id={comment.comment_id}
                votes={comment.votes}
              />
            </section>
          );
        })
      )}
    </section>
  );
};

export default SingleReviewComments;
