import React from 'react';
import QuestionImage from './common/QuestionImage';
import QuestionOptions from './common/QuestionOptions';

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
  const q = preguntas[index];

  return wrapCentered(
    <div>
      <h2 className="text-3xl font-bold mb-10">Práctica - Pregunta {index + 1} de {preguntas.length}</h2>
      <div className={`p-6 rounded-xl mb-6 ${colores.card} shadow-xl flex flex-col`} style={cardStyle}>
        <p className="font-bold mb-4 text-xl">{q.Pregunta}</p>
        <QuestionOptions q={q} vista={vista} index={index} preguntasExamen={preguntasExamen} preguntas={preguntas} mostrarFeedback={mostrarFeedback} respuestas={respuestas} toggleSeleccion={toggleSeleccion} />
        <div className="flex justify-between mt-6 items-center">
          <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9]`} onClick={() => setMostrarFeedback(prev => !prev)}>Comprobar</button>
          <div className="space-x-4 flex">
            <button type="button" disabled={index === 0} className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9]`} onClick={() => { setIndex(index - 1); setMostrarFeedback(false); }}>Anterior</button>
            <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9]`} onClick={() => { setIndex(index + 1); setMostrarFeedback(false); }}>Siguiente</button>
          </div>
        </div>
      </div>
      <QuestionImage src={q.Imagen} alt={`Pregunta ${q.Numero}`} />
    </div>
  );
};

export default Practice;