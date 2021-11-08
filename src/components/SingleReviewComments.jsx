import React from "react";
import { useState } from "react";
import useSingleReviewComments from "../hooks/useSingleReviewComments";
import AlterCommentVotes from "./voting/alterCommentVotes";
import { postComment } from "../utils/api";
import RemoveComment from "./RemoveComment";

const SingleReviewComments = ({ review_id, username }) => {
  const { comments, loading, err, setComments } =
    useSingleReviewComments(review_id);
  const [isError, setIsError] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [commentTimeout, setCommentTimeout] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);
    setIsError(false);
    postComment(review_id, username, commentBody)
      .then((comment) => {
        setCommentTimeout(true);
        setSubmitted(true);
        setComments([...comments, comment]);
        setCommentBody("");
        setTimeout(() => {
          setCommentTimeout(false);
        }, 1000);
      })
      .catch((err) => {
        setIsError(true);
        console.dir(err);
      });
  };

  if (loading) {
    return <h3>LOADING...</h3>;
  }
  if (err) {
    return <p>{err}</p>;
  }
  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="SingleReviewComments--post-comment-instructions"
      >
        {" "}
        <div>
          <textarea
            rows="10"
            cols="50"
            id="post_comment"
            placeholder="write comment here..."
            className="SingleReviewComments__input--post-message"
            onChange={(e) => {
              setCommentBody(e.target.value);
            }}
            value={commentBody}
            required
          />
        </div>
        <button className="Styled-button-small">Post Comment!</button>
        {submitted && commentTimeout && (
          <h3 className="comment-review__posted-message">Comment Posted!</h3>
        )}
        {isError && (
          <h3 className="comment-review__posted-message">
            Unable to post comment!
          </h3>
        )}
      </form>
      {comments === [] ? (
        <h3 className="SingleReviewComments__h3--no-comments-message">
          No Comments To Show!
        </h3>
      ) : (
        comments.map((comment) => {
          return (
            <section
              key={comment.comment_id}
              className="SingleReview__comments-section"
            >
              <h3 className="singleReviewComments__section--author">
                {comment.author}
              </h3>
              <p>{comment.body}</p>
              <AlterCommentVotes
                comment_id={comment.comment_id}
                votes={comment.votes}
              />
              {comment.author === username && (
                <RemoveComment
                  comment_id={comment.comment_id}
                  comments={comments}
                  setComments={setComments}
                ></RemoveComment>
              )}
            </section>
          );
        })
      )}
    </section>
  );
};

export default SingleReviewComments;
