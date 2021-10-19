import React from "react";
import { Link, useParams } from "react-router-dom";
import useSingleReview from "../hooks/useSingleReview";
import useLikeCount from "../hooks/useLikeCount";
import useDislikeCount from "../hooks/useDislikeCount";

const SingleReview = () => {
  const { review_id } = useParams();
  const { likeCount, incLikeCount } = useLikeCount();
  const { dislikeCount, incDislikeCount } = useDislikeCount();
  const { review, loading, err } = useSingleReview(review_id);
  if (loading) {
    return <h3>LOADING...</h3>;
  }
  if (err) {
    return <p>{err}</p>;
  }
  return (
    <section className="single_review">
      <h1 className="single_review_h1">{review.title}</h1>
      <img className="review_img" src={review.review_img_url} />
      <h4>Designer: {review.designer}</h4>
      <h4>Category: {review.category}</h4>
      <h2 class="review_body_title">Review</h2>
      <p>{review.review_body}</p>
      <h2>Votes: {review.votes + likeCount - dislikeCount}</h2>
      <span>
        <button onClick={incLikeCount} className="like_button">
          Upvote!
        </button>
        <button onClick={incDislikeCount} className="dislike_button">
          Downvote!
        </button>
        <Link to={`/reviews/${review.review_id}/comments`}>
          <button>View Comments: ({review.comment_count})</button>
        </Link>
      </span>
    </section>
  );
};

export default SingleReview;
