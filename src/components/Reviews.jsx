import React from "react";
import { Link, useParams } from "react-router-dom";
import useReviews from "../hooks/useReviews";
import { capitalizeStrings } from "../utils/utils_functions";
import { useState } from "react";
import {
  timeConverter,
  grabNumbersFromTimestamp,
} from "../utils/utils_functions";

const Reviews = () => {
  const { categorySlug } = useParams();
  const [sortBy, setSortBy] = useState([]);
  const { reviews, loading, err } = useReviews(categorySlug, sortBy);
  console.log(sortBy, "in reviews");

  if (loading) {
    return <h3>LOADING...</h3>;
  }
  if (err) {
    return <p>{err}</p>;
  }

  return (
    <section className="reviews">
      {categorySlug ? (
        <h2 className="Reviews__category--title">{`${capitalizeStrings(
          categorySlug
        )} Reviews!`}</h2>
      ) : (
        <h2>All Reviews!</h2>
      )}
      <h2>sort reviews by:</h2>
      <nav>
        <ul>
          <li>
            <button onClick={() => setSortBy("sort_by=created_at")}>
              Date
            </button>
            <button onClick={() => setSortBy("sort_by=comment_count")}>
              Amount Of Comments
            </button>
            <button onClick={() => setSortBy("sort_by=votes")}>
              Amount Of Votes
            </button>
          </li>
        </ul>
      </nav>
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.review_id}>
              <section className="review_section">
                <Link to={`/reviews/${review.review_id}`}>
                  <h2 className="Reviews__h2--review-title">{review.title}</h2>
                </Link>
                <h4>Designer: {review.designer}</h4>
                <h4>Category: {review.category}</h4>
                <h5>
                  posted:{" "}
                  {() => {
                    timeConverter(review.created_at);
                  }}{" "}
                  - votes: {review.votes} - comments: {review.comment_count}
                </h5>
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Reviews;
