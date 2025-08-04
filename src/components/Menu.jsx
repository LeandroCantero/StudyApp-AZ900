import React from 'react';
import { colores } from '../constants';

export default function Menu({ iniciarExamen, iniciarPractica, iniciarFlashcards, setVista }) {
  return (
    <div className={`p-4 sm:p-8 space-y-6 min-h-screen flex flex-col justify-center items-center ${colores.fondo}`}>
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-12 sm:mb-16 text-center">App de Práctica AZ-900</h1>
      <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] w-full sm:w-72`} onClick={iniciarExamen}>Examen</button>
      <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] w-full sm:w-72`} onClick={iniciarPractica}>Práctica</button>
      <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] w-full sm:w-72`} onClick={iniciarFlashcards}>Flashcards</button>
      <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] w-full sm:w-72`} onClick={() => setVista("historial")}>Historial</button>
    </div>
  );
}