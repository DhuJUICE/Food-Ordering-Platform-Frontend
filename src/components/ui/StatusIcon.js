import React from "react";

const StatusIcon = ({ type = "success" }) => {
  const styles =
    type === "success"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";

  const icon =
    type === "success" ? (
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    );

  return (
    <div className={`mx-auto mb-6 w-24 h-24 flex items-center justify-center rounded-full ${styles}`}>
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        {icon}
      </svg>
    </div>
  );
};

export default StatusIcon;