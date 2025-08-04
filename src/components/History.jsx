import React from 'react';

import { colores } from '../constants';

const History = ({ historial, wrapCentered, borrarDelHistorial }) => {
  return wrapCentered(
    <div className="w-full text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-10">Historial de Exámenes</h2>
      {historial.length === 0 && <p className="text-lg sm:text-xl">No hay intentos aún.</p>}
      <ul className="space-y-4 w-full">
        {historial.map((h, i) => (
          <li key={i} className={`p-4 rounded-xl ${colores.card} shadow-lg text-base sm:text-lg flex flex-col sm:flex-row justify-between items-center`}>
            <span className="flex-grow text-center sm:text-left mb-2 sm:mb-0">
              {h.fecha} - Nota: {h.nota}% - Tiempo: {Math.floor(h.tiempo / 60)}:{(h.tiempo % 60).toString().padStart(2, '0')}
            </span>
            <button onClick={() => borrarDelHistorial(i)} className="ml-0 sm:ml-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-transform duration-200 ease-in-out hover:scale-105 hover:cursor-pointer w-full sm:w-auto">
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;