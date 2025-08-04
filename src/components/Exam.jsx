import React from 'react';
import QuestionImage from './common/QuestionImage';
import QuestionOptions from './common/QuestionOptions';

import { colores, cardStyle, EXAM_WEIGHTS } from '../constants';

const Exam = ({
  finalizado,
  preguntasExamen,
  esCorrecta,
  wrapCentered,
  index,
  tiempoRestante,
  setMostrarFeedback,
  setIndex,
  setFinalizado,
  setHistorial,
  historial,
  vista,
  preguntas,
  respuestas,
  toggleSeleccion,
  mostrarFeedback
}) => {
  if (finalizado) {
    const correctas = preguntasExamen.filter(q => esCorrecta(q));
    return wrapCentered(
      <div className="w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10 text-center">Examen Finalizado</h2>
        <p className="mb-6 sm:mb-10 text-xl sm:text-2xl font-semibold text-center">Nota: {((correctas.length / preguntasExamen.length) * 100).toFixed(2)}%</p>
        <div className="space-y-4 w-full flex flex-col items-center">
          {preguntasExamen.map(q => (
            <div key={q.numero} className={`p-4 sm:p-6 rounded-xl ${colores.card} shadow-lg w-full`} style={cardStyle}>
              <p className="mb-2 text-lg sm:text-xl font-semibold">{q.numero}. {q.pregunta}</p>
              <QuestionOptions q={q} vista={vista} index={index} preguntasExamen={preguntasExamen} preguntas={preguntas} mostrarFeedback={mostrarFeedback} respuestas={respuestas} toggleSeleccion={toggleSeleccion} review={true} />
              <QuestionImage src={q.imagen} alt={`Pregunta ${q.numero}`} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const q = preguntasExamen[index];
  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = (tiempoRestante % 60).toString().padStart(2, '0');

  return wrapCentered(
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 w-full">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-0 text-center">Pregunta {index + 1} de {preguntasExamen.length}</h2>
        <p className="text-lg sm:text-xl">⏱ {minutos}:{segundos}</p>
      </div>
      <div className={`p-4 sm:p-6 rounded-xl mb-6 ${colores.card} shadow-xl flex flex-col`} style={cardStyle}>
        <p className="font-bold mb-4 text-lg sm:text-xl">{q.pregunta}</p>
        <QuestionOptions q={q} vista={vista} index={index} preguntasExamen={preguntasExamen} preguntas={preguntas} mostrarFeedback={mostrarFeedback} respuestas={respuestas} toggleSeleccion={toggleSeleccion} />
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] w-full sm:w-auto`}
            onClick={() => {
              setMostrarFeedback(false);
              if (index < preguntasExamen.length - 1) {
                setIndex(index + 1);
              } else {
                setFinalizado(true);
                const nota = ((preguntasExamen.filter(q => esCorrecta(q)).length / preguntasExamen.length) * 100).toFixed(2);
                const tiempoTotal = 45 * 60;
                const tiempoTranscurrido = tiempoTotal - tiempoRestante;
                setHistorial([{ fecha: new Date().toLocaleString(), nota, tiempo: tiempoTranscurrido }, ...historial]);
              }
            }}
          >
            Siguiente
          </button>
        </div>
      </div>
      <QuestionImage src={q.imagen} alt={`Pregunta ${q.numero}`} />
    </div>
  );
};

export default Exam;