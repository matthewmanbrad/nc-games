import React from "react";
import { Link, useParams } from "react-router-dom";
import useReviews from "../hooks/useReviews";
import { capitalizeStrings } from "../utils/utils_functions";
import { useState } from "react";
import { timeConverter } from "../utils/utils_functions";

const Reviews = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { categorySlug } = useParams();
  const [sortBy, setSortBy] = useState("");
  const { reviews, loading, err } = useReviews(
    categorySlug,
    sortBy,
    pageNumber
  );

  const handleClick = (num) => {
    setPageNumber((currPageNumber) => currPageNumber + num);
  };

  if (loading) {
    return <h3>LOADING...</h3>;
  }
  if (err) {
    return <p>{err}</p>;
  }
  console.log(reviews, "<<<< IN REVIEWS");
  // const lastPage = Math.ceil(reviews.length / 3);

  return (
    <section className="reviews">
      <Link to="/write-review">
        <button className="Styled-button-large">Write A Review!</button>
      </Link>
      {categorySlug ? (
        <h2 className="Reviews__category--title">{`${capitalizeStrings(
          categorySlug
        )} Reviews!`}</h2>
      ) : (
        <h2>All Reviews!</h2>
      )}
      <h2 className="Reviews__sort-by-header">sort reviews by:</h2>
      <nav className="Reviews__container--sort-by-buttons">
        <button
          className="Styled-button-medium"
          onClick={() => setSortBy("sort_by=created_at")}
        >
          Date
        </button>
        <button
          className="Styled-button-medium"
          onClick={() => setSortBy("sort_by=comment_count")}
        >
          Amount Of Comments
        </button>
        <button
          className="Styled-button-medium"
          onClick={() => setSortBy("sort_by=votes")}
        >
          Amount Of Votes
        </button>
      </nav>
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.review_id}>
              <section className="review_section">
                <Link
                  to={`/reviews/${review.review_id}`}
                  key={review.review_id}
                >
                  <h2 className="Reviews__h2--review-title">{review.title}</h2>
                </Link>
                <h4>Designer: {review.designer}</h4>
                <h4>Category: {review.category}</h4>
                <h5>
                  posted: {timeConverter(review.created_at)} - votes:{" "}
                  {review.votes} - comments: {review.comment_count}
                </h5>
              </section>
            </li>
          );
        })}
      </ul>
      <div>
        <span>
          {pageNumber === 1 ? (
            <button
              className="Styled-button-small Styled-button-small-disabled"
              disabled
            >
              previous page
            </button>
          ) : (
            <button
              className="Styled-button-small"
              onClick={() => {
                handleClick(-1);
              }}
            >
              previous page
            </button>
          )}
          {reviews.length < 3 ? (
            <button
              className="Styled-button-small Styled-button-small-disabled"
              disabled
            >
              next page
            </button>
          ) : (
            <button
              className="Styled-button-small"
              onClick={() => {
                handleClick(1);
              }}
            >
              next page
            </button>
          )}
        </span>
      </div>
    </section>
  );
};

export default Reviews;
