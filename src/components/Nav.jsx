import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../utils/api";

const Nav = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((categoriesFromApi) => {
      setCategories(categoriesFromApi);
    });
  }, []);
  return (
    <nav className="Nav--main-nav">
      <ul className="Nav__ul">
        <li className="Nav__li">
          <Link className="Nav__link" key="home" to={"/"}>
            HOME
          </Link>
        </li>
        {categories.map((category) => {
          return (
            <li className="Nav__li">
              <Link
                className="Nav__link"
                key={category.slug}
                to={`/categories/${category.slug}`}
              >
                {category.slug.toUpperCase()}
              </Link>
            </li>
          );
        })}
        <li className="Nav__li">
          <Link className="Nav__link" key="allReviews" to={"/reviews"}>
            ALL REVIEWS
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
