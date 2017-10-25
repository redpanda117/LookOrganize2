import React from "react";

export const List = ({ children }) => {
  return (
    <div className="list">
      <ul className="list-group">
        {children}
      </ul>
    </div>
  );
};
