import React from 'react';

const QuestionImage = ({ src, alt }) => {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className="mt-6 rounded-xl shadow-lg max-w-3xl w-full object-contain"
    />
  );
};

export default QuestionImage;