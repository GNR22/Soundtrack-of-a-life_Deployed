import React from "react";

export default function RatingStars({ rating = 0, onChange }) {
  const stars = [1,2,3,4,5];
  return (
    <div className="flex items-center gap-1">
      {stars.map(n => (
        <button
          key={n}
          type="button"
          onClick={() => onChange ? onChange(n) : null}
          className={`text-xl ${rating >= n ? "text-yellow-400" : "text-gray-300"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
