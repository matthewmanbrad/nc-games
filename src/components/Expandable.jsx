import React from "react";
import { useState } from "react";

const Expandable = ({ amountOfComments, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };
  return (
    <div>
      <button className="Styled-button-large" onClick={toggleIsOpen}>
        {isOpen ? "Hide Comments!" : `Show Comments (${amountOfComments})`}
      </button>
      {isOpen && children}
    </div>
  );
};

export default Expandable;
