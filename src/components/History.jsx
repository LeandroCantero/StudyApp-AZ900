import React from 'react';

import { colores } from '../constants';

const History = ({ historial, wrapCentered }) => {
  return wrapCentered(
    <div>
      <h2 className="text-3xl font-bold mb-10">Historial de Exámenes</h2>
      {historial.length === 0 && <p className="text-xl">No hay intentos aún.</p>}
      <ul className="space-y-4 w-full max-w-3xl">
        {historial.map((h, i) => (
          <li key={i} className={`p-4 rounded-xl ${colores.card} shadow-lg text-lg`}>
            {h.fecha} - Nota: {h.nota}%
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;