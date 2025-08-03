import React from 'react';

const QuestionOptions = React.memo(({ q, vista, index, preguntasExamen, preguntas, mostrarFeedback, respuestas, toggleSeleccion, review = false }) => {
  if (!q) return null;

  const multiple = Array.isArray(q.respuesta);
  const selected = respuestas[q.numero];

  if (!q.opciones) return null;

  return q.opciones.map(op => {
    const isSelected = multiple ? (selected || []).includes(op) : selected === op;
    const isCorrect = Array.isArray(q.respuesta) ? q.respuesta.includes(op) : q.respuesta === op;

    let highlight = "";
    if (review) {
      if (isCorrect) highlight = "bg-green-500/30";
      if (isSelected && !isCorrect) highlight = "bg-red-500/30";
    } else if (mostrarFeedback && isCorrect && q.numero === (vista === "examen" ? preguntasExamen[index].numero : preguntas[index].numero)) {
      highlight = "bg-green-500/30";
    }

    return (
      <label
        key={op}
        className={`flex items-center mb-3 p-4 rounded-xl hover:bg-[#34485f] cursor-pointer text-xl w-full transition-colors duration-200 ${highlight}`}
      >
        <input
          type={multiple ? "checkbox" : "radio"}
          name={`${vista}_${q.numero}`}
          className={`mr-4 w-6 h-6 accent-[#778da9] rounded-full cursor-pointer ${isSelected ? 'bg-[#778da9]' : ''}`}
          checked={isSelected}
          onChange={() => toggleSeleccion(q.numero, op, multiple)}
          disabled={review}
        />
        {op}
      </label>
    );
  });
});

export default QuestionOptions;