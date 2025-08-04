import React, { useState, useMemo } from 'react';
import QuestionImage from './common/QuestionImage';
import QuestionOptions from './common/QuestionOptions';
import CategoryFilter from './common/CategoryFilter';
import QuestionNavigator from './common/QuestionNavigator';

import { colores, cardStyle } from '../constants';

const Practice = ({
  preguntas,
  index,
  wrapCentered,
  setMostrarFeedback,
  setIndex,
  mostrarFeedback,
  vista,
  preguntasExamen,
  respuestas,
  toggleSeleccion
}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const filteredPreguntas = useMemo(() => {
    if (!selectedCategory) return preguntas;
    return preguntas.filter(p => p.categoria === selectedCategory);
  }, [preguntas, selectedCategory]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setIndex(0);
    setMostrarFeedback(false);
  };

  const handleNavigate = (newIndex) => {
    setIndex(newIndex);
    setMostrarFeedback(false);
  };

  // Si no hay preguntas filtradas o el índice está fuera de rango, mostrar un mensaje
  if (filteredPreguntas.length === 0) {
    return wrapCentered(
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-10">No hay preguntas disponibles para esta categoría</h2>
      </div>
    );
  }

  // Asegurarse de que el índice esté dentro de los límites
  const safeIndex = Math.min(index, filteredPreguntas.length - 1);
  const q = filteredPreguntas[safeIndex];

  return wrapCentered(
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 text-center">Práctica</h2>
        <div className="text-lg sm:text-xl mb-4 sm:mb-0">
          <QuestionNavigator currentIndex={safeIndex} total={filteredPreguntas.length} onNavigate={handleNavigate} />
        </div>
        <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={handleCategorySelect} />
      </div>
      <div className={`p-4 sm:p-6 rounded-xl mb-6 ${colores.card} shadow-xl flex flex-col`} style={cardStyle}>
        <p className="font-bold mb-4 text-lg sm:text-xl">{q.pregunta}</p>
        <QuestionOptions q={q} vista={vista} index={safeIndex} preguntasExamen={preguntasExamen} preguntas={filteredPreguntas} mostrarFeedback={mostrarFeedback} respuestas={respuestas} toggleSeleccion={toggleSeleccion} />
        <div className="flex flex-col sm:flex-row justify-between mt-6 items-center">
          <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] w-full sm:w-auto mb-2 sm:mb-0`} onClick={() => setMostrarFeedback(prev => !prev)}>Comprobar</button>
          <div className="space-y-2 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row w-full sm:w-auto">
            <button type="button" disabled={index === 0} className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] w-full`} onClick={() => { setIndex(index - 1); setMostrarFeedback(false); }}>Anterior</button>
            <button
              type="button"
              disabled={index === filteredPreguntas.length - 1}
              className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] disabled:opacity-50 w-full`}
              onClick={() => { setIndex(index + 1); setMostrarFeedback(false); }}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
      <QuestionImage src={q.imagen} alt={`Pregunta ${q.numero}`} />
    </div>
  );
};

export default Practice;