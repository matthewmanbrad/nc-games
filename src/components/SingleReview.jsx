import React from "react";
import { useParams } from "react-router-dom";
import useSingleReview from "../hooks/useSingleReview";
import Expandable from "./Expandable";
import SingleReviewComments from "./SingleReviewComments";
import AlterReviewVotes from "./voting/AlterReviewVotes";

const SingleReview = ({ user }) => {
  const { review_id } = useParams();
  const { review, loading, err } = useSingleReview(review_id);

  if (loading) {
    return <h3>LOADING...</h3>;
  }
  if (err) {
    return <p>{err}</p>;
  }
  return (
    <section className="SingleReview__section">
      <h3 className="SingleReview__info--title">{review.title}</h3>

      <h4 className="SingleReview__info--designer-category">
        Designer: {review.designer}
      </h4>
      <h4 className="SingleReview__info--designer-category">
        Category: {review.category}
      </h4>
      <img
        className="singleReview__img--review-img"
        src={review.review_img_url}
        alt={review.title}
      />
      <h2 className="SingleReview__review-body--header">Review</h2>
      <p>{review.review_body}</p>
      <span>
        <AlterReviewVotes review_id={review.review_id} votes={review.votes} />
      </span>
      <Expandable amountOfComments={review.comment_count}>
        <SingleReviewComments
          review_id={review_id}
          username={user}
        ></SingleReviewComments>
      </Expandable>
    </section>
  );
};

export default SingleReview;
