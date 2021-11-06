import React from "react";
import { useState, useContext } from "react";
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
  console.log(commentBody);
  console.log(username);
  console.log(review_id);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);
    setIsError(false);
    postComment(review_id, username, commentBody)
      .then((comment) => {
        console.log(`${comment}`);
        setSubmitted(true);
        setComments([...comments, comment]);
        setCommentBody("");
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
      <form
        onSubmit={handleSubmit}
        className="SingleReviewComments--post-comment-instructions"
      >
        <label htmlFor="post_comment">Add Comment Here: </label>
        <input
          type="textarea"
          id="post_comment"
          placeholder="write comment here..."
          className="SingleReviewComments__input--post-message"
          onChange={(e) => {
            setCommentBody(e.target.value);
          }}
          value={commentBody}
          required
        />
        <button>Post Comment!</button>
        {isError && <h3>Unable to post comment!</h3>}
      </form>
    </section>
  );
};

export default SingleReviewComments;
