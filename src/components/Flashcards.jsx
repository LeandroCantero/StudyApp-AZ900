import React from 'react';
import QuestionImage from './common/QuestionImage';
import QuestionNavigator from './common/QuestionNavigator';

import { colores, cardStyle } from '../constants';

const Flashcards = ({
  preguntas,
  index,
  wrapCentered,
  setIndex,
  mostrarRespuesta,
  setMostrarRespuesta
}) => {
  const q = preguntas[index];

  const handleNavigate = (newIndex) => {
    setIndex(newIndex);
    setMostrarRespuesta(false);
  };

  return wrapCentered(
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-0 text-center">Flashcards</h2>
        <div className="text-lg sm:text-xl">
          <QuestionNavigator currentIndex={index} total={preguntas.length} onNavigate={handleNavigate} />
        </div>
      </div>
      <div className={`p-6 sm:p-8 rounded-xl mb-6 ${colores.card} shadow-xl flex flex-col text-center cursor-pointer hover:bg-[#34485f]`} style={cardStyle} onClick={() => setMostrarRespuesta(!mostrarRespuesta)}>
        <p className="font-bold text-xl sm:text-2xl mb-4">{q.pregunta}</p>
        <div style={{ minHeight: '2rem' }}>
          {mostrarRespuesta && <p className="mt-4 text-green-400 font-bold text-lg sm:text-xl">{Array.isArray(q.respuesta) ? q.respuesta.join(", ") : q.respuesta}</p>}
        </div>
      </div>
      <QuestionImage src={q.imagen} alt={`Pregunta ${q.numero}`} />
    </div>
  );
};

export default Flashcards;