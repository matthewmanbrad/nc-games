import React, { useState, useContext } from "react";
import { postReview } from "../utils/api";
import useReviews from "../hooks/useReviews";
import { UserContext } from "../contexts/User";

const WriteReview = () => {
  const { user, setUser } = useContext(UserContext);
  const { reviews, loading, err, setReviews } = useReviews();
  const [newReview, setNewReview] = useState({ owner: user });
  const [isError, setIsError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reviewTimeout, setReviewTimeout] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(false);
    setIsError(false);
    postReview(newReview)
      .then((review) => {
        setReviewTimeout(true);
        setSubmitted(true);
        setReviews([...reviews, review]);
        setNewReview({ owner: user });
        setTimeout(() => {
          setReviewTimeout(false);
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
    <section className="WriteReviewContainer">
      <h2>Please fill in the required fields:</h2>
      <form className="WriteReview-form" onSubmit={handleSubmit}>
        <div>
          <label className="WriteReview-instruction" htmlFor="title">
            Review Title:{" "}
          </label>
          <input
            className="WriteReview-box"
            type="text"
            id="title"
            name="title"
            required
            onChange={(e) => {
              setNewReview(() => {
                const reviewCopy = { ...newReview };
                reviewCopy.title = e.target.value;
                return reviewCopy;
              });
            }}
          />
        </div>
        <div>
          <label className="WriteReview-instruction" htmlFor="designer">
            Designer:{" "}
          </label>
          <input
            className="WriteReview-box"
            type="text"
            id="designer"
            name="designer"
            required
            onChange={(e) => {
              setNewReview(() => {
                const reviewCopy = { ...newReview };
                reviewCopy.designer = e.target.value;
                return reviewCopy;
              });
            }}
          ></input>
        </div>
        <div>
          <label className="WriteReview-instruction" htmlFor="category">
            Category:{" "}
          </label>
          <select
            className="WriteReview-box"
            onChange={(e) => {
              setNewReview(() => {
                const reviewCopy = { ...newReview };
                reviewCopy.category = e.target.value;
                return reviewCopy;
              });
            }}
            id="category"
            name="category"
            required
          >
            <option value="strategy">Strategy</option>
            <option value="hidden-roles">Hidden Roles</option>
            <option value="dexterity">Dexterity</option>
            <option value="push-your-luck">Push Your Luck</option>
            <option value="roll-and-write">Roll And Write</option>
            <option value="deck-building">Deck Building</option>
            <option value="engine-building">Engine Building</option>
          </select>
        </div>
        <div>
          <label className="WriteReview-instruction" htmlFor="review-body">
            Review:{" "}
          </label>
          <textarea
            className="WriteReview-box-textArea"
            id="review-body"
            name="review-body"
            required
            onChange={(e) => {
              setNewReview(() => {
                const reviewCopy = { ...newReview };
                reviewCopy.review_body = e.target.value;
                return reviewCopy;
              });
            }}
          ></textarea>
        </div>
        <div>
          <input
            className="Styled-button-small"
            type="submit"
            value="Submit"
          ></input>
        </div>
      </form>
      {submitted && reviewTimeout && <h2>Review Successfully Posted</h2>}
    </section>
  );
};

export default WriteReview;
