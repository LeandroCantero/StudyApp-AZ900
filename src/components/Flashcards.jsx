import React from 'react';
import QuestionImage from './common/QuestionImage';

import { colores } from '../constants';

const Flashcards = ({
  preguntas,
  index,
  wrapCentered,
  setIndex,
  mostrarRespuesta,
  setMostrarRespuesta
}) => {
  const q = preguntas[index];

  return wrapCentered(
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold mb-6">Flashcard {index + 1}/{preguntas.length}</h2>
      <div className="flex justify-center mb-4 space-x-20">
        <button type="button" disabled={index === 0} className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] disabled:opacity-50`} onClick={() => { setIndex(index - 1); setMostrarRespuesta(false); }}>←</button>
        <button type="button" disabled={index === preguntas.length - 1} className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] disabled:opacity-50`} onClick={() => { setIndex(index + 1); setMostrarRespuesta(false); }}>→</button>
      </div>
      <div className={`p-8 rounded-xl mb-6 text-center ${colores.card} shadow-xl flex flex-col items-center cursor-pointer hover:bg-[#34485f]`} style={{ minHeight: '350px', width: '768px' }} onClick={() => setMostrarRespuesta(!mostrarRespuesta)}>
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