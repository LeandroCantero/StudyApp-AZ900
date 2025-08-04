import React, { useState, useEffect } from 'react';
import { colores } from '../../constants';

const QuestionNavigator = ({ currentIndex, total, onNavigate }) => {
  const [inputValue, setInputValue] = useState(currentIndex + 1);

  useEffect(() => {
    setInputValue(currentIndex + 1);
  }, [currentIndex]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value === '') {
      return;
    }

    const newIndex = parseInt(value, 10) - 1;
    if (!isNaN(newIndex) && newIndex >= 0 && newIndex < total) {
      onNavigate(newIndex);
    }
  };

  const handleBlur = () => {
    if (inputValue === '' || parseInt(inputValue, 10) > total || parseInt(inputValue, 10) < 1) {
      setInputValue(currentIndex + 1);
    }
  };

  const increment = () => {
    const newIndex = Math.min(currentIndex + 1, total - 1);
    onNavigate(newIndex);
  };

  const decrement = () => {
    const newIndex = Math.max(currentIndex - 1, 0);
    onNavigate(newIndex);
  };

  return (
    <div className="flex items-center space-x-2 text-xl">
      <button onClick={decrement} disabled={currentIndex === 0} className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] disabled:opacity-50 px-3 py-1`}>←</button>
      <div className="flex items-center">
        <input
          type="number"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          className="w-16 text-center bg-gray-700 text-white rounded text-xl"
          min="1"
          max={total}
        />
        <span className="ml-2">de {total}</span>
      </div>
      <button onClick={increment} disabled={currentIndex === total - 1} className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] disabled:opacity-50 px-3 py-1`}>→</button>
    </div>
  );
};

export default QuestionNavigator;