import React, { useState, useRef, useEffect } from 'react';
import { CATEGORIES } from '../../config';
import { colores } from '../../constants';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentCategoryName = () => {
    if (!selectedCategory) return "All";
    const category = Object.values(CATEGORIES).find(cat => cat.id === selectedCategory);
    return category ? category.name : "All";
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#1b2838] border border-[#415a77] rounded-lg p-2 text-white focus:outline-none focus:border-[#778da9] hover:bg-[#34485f] hover:cursor-pointer transition-colors duration-200"
        title={getCurrentCategoryName()}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${selectedCategory ? 'text-[#778da9]' : 'text-white'}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-64 bg-[#1b2838] rounded-lg shadow-xl z-10">
          <button
            className={`w-full px-4 py-2 text-left hover:bg-[#34485f] hover:cursor-pointer transition-colors duration-200 ${!selectedCategory ? 'text-[#778da9]' : 'text-white'}`}
            onClick={() => {
              onSelectCategory(null);
              setIsOpen(false);
            }}
          >
            All
          </button>
          {Object.values(CATEGORIES).map((category) => (
            <button
              key={category.id}
              className={`w-full px-4 py-2 text-left hover:bg-[#34485f] hover:cursor-pointer transition-colors duration-200 ${selectedCategory === category.id ? 'text-[#778da9]' : 'text-white'}`}
              onClick={() => {
                onSelectCategory(category.id);
                setIsOpen(false);
              }}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(CategoryFilter);
