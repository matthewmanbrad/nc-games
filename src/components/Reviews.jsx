import React from "react";
import { Link, useParams } from "react-router-dom";
import useReviews from "../hooks/useReviews";
import { capitalizeStrings } from "../utils/utils_functions";

const Reviews = () => {
  const { categorySlug } = useParams();
  const { reviews, loading, err } = useReviews(categorySlug);

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
              </section>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Reviews;
