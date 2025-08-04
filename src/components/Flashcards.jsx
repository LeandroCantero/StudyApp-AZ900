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
    <div className="inline-block max-w-4xl">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold">Flashcards</h2>
        <div className="text-xl">
          <QuestionNavigator currentIndex={index} total={preguntas.length} onNavigate={handleNavigate} />
        </div>
      </div>
      <div className={`p-8 rounded-xl mb-6 ${colores.card} shadow-xl flex flex-col text-center cursor-pointer hover:bg-[#34485f]`} style={cardStyle} onClick={() => setMostrarRespuesta(!mostrarRespuesta)}>
        <p className="font-bold text-2xl mb-4">{q.pregunta}</p>
        <div style={{ minHeight: '2rem' }}>
          {mostrarRespuesta && <p className="mt-4 text-green-400 font-bold text-xl">{Array.isArray(q.respuesta) ? q.respuesta.join(", ") : q.respuesta}</p>}
        </div>
      </div>
      <QuestionImage src={q.imagen} alt={`Pregunta ${q.numero}`} />
    </div>
  );
};

export default Flashcards;