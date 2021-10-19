import React from "react";
import { Link, useParams } from "react-router-dom";
import useSingleReviewComments from "../hooks/useSingleReviewComments";
import useLikeCount from "../hooks/useLikeCount";
import useDislikeCount from "../hooks/useDislikeCount";

const SingleReviewComments = () => {
  const { review_id } = useParams();
  const { comments, loading, err } = useSingleReviewComments(review_id);
  const { likeCount, incLikeCount } = useLikeCount();
  const { dislikeCount, incDislikeCount } = useDislikeCount();
  if (loading) {
    return <h3>LOADING...</h3>;
  }
  if (err) {
    return <p>{err}</p>;
  }
  return (
    <section>
      {comments === [] ? (
        <h1>No Comments To Show!</h1>
      ) : (
        comments.map((comment) => {
          return (
            <section>
              <h1 class="author_name">{comment.author}</h1>
              <p>{comment.body}</p>
              <h2>Votes: {comment.votes + likeCount - dislikeCount}</h2>
              <span>
                <button onClick={incLikeCount} className="like_button">
                  Upvote!
                </button>
                <button onClick={incDislikeCount} className="dislike_button">
                  Downvote!
                </button>
              </span>
            </section>
          );
        })
      )}
    </section>
  );
};

export default SingleReviewComments;
