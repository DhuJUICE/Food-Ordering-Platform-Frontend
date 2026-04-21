import React from "react";

const PageCard = ({ children }) => {
  return (
    <div className="bg-white shadow-xl rounded-xl p-10 md:p-16 w-full max-w-xl text-center">
      {children}
    </div>
  );
};

export default PageCard;