import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/api";
import { capitalizeStrings } from "../utils/utils_functions";

const Nav = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((categoriesFromApi) => {
      setCategories(categoriesFromApi);
    });
  }, []);
  return (
    <nav className="nav main-nav">
      <ul>
        <li>
          <Link className="nav-link" key="home" to={"/"}>
            HOME
          </Link>
        </li>
        {categories.map((category) => {
          return (
            <li>
              <Link
                className="nav-link"
                key={category.slug}
                to={`/categories/${category.slug}`}
              >
                {category.slug.toUpperCase()}
              </Link>
            </li>
          );
        })}
        <li>
          <Link className="nav-link" key="allReviews" to={"/reviews"}>
            ALL REVIEWS
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
