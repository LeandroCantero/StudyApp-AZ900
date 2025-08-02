import React from 'react';

const BackButton = ({ onClick }) => (
  <button
    type="button"
    className="fixed top-6 left-6 bg-[#778da9] hover:bg-[#e0e1dd] text-[#0d1b2a] px-6 py-2 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 hover:cursor-pointer text-2xl font-bold border border-[#0d1b2a]"
    onClick={onClick}
  >
    ←
  </button>
);

export default BackButton;