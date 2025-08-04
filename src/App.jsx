import React, { useState, useEffect } from "react";
import preguntasJson from './preguntas_respuestas_numeradas_orden.json';
import Menu from './components/Menu';
import BackButton from './components/common/BackButton';
import Practice from './components/Practice'
import Exam from './components/Exam';
import Flashcards from './components/Flashcards';
import History from './components/History';
import { useShuffle } from './hooks/useShuffle';
import { colores, cardStyle, EXAM_WEIGHTS } from './constants';
import { EXAM_TIME_MINUTES, EXAM_QUESTIONS_COUNT, LOCAL_STORAGE_HISTORY_KEY } from './config';

export default function App({ preguntas = preguntasJson }) {
  const shuffleArray = useShuffle();
  const [vista, setVista] = useState("menu");
  const [index, setIndex] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [finalizado, setFinalizado] = useState(false);
  const [historial, setHistorial] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [preguntasExamen, setPreguntasExamen] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(EXAM_TIME_MINUTES * 60);


  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(historial));
  }, [historial]);

  useEffect(() => {
    let timer;
    if (vista === "examen" && !finalizado) {
      timer = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            setFinalizado(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [vista, finalizado]);

  const iniciarExamen = () => {
    let seleccionadas = [];
    const preguntasPorCategoria = preguntas.reduce((acc, p) => {
      acc[p.categoria] = acc[p.categoria] || [];
      acc[p.categoria].push(p);
      return acc;
    }, {});

    Object.keys(EXAM_WEIGHTS).forEach(categoria => {
      const count = Math.round(EXAM_QUESTIONS_COUNT * EXAM_WEIGHTS[categoria]);
      const categoriaPreguntas = preguntasPorCategoria[categoria] || [];
      seleccionadas = seleccionadas.concat(shuffleArray(categoriaPreguntas).slice(0, count));
    });

    while (seleccionadas.length < EXAM_QUESTIONS_COUNT) {
      const categoriaAleatoria = Object.keys(preguntasPorCategoria)[Math.floor(Math.random() * Object.keys(preguntasPorCategoria).length)];
      const preguntaAleatoria = preguntasPorCategoria[categoriaAleatoria][Math.floor(Math.random() * preguntasPorCategoria[categoriaAleatoria].length)];
      if (!seleccionadas.find(p => p.numero === preguntaAleatoria.numero)) {
        seleccionadas.push(preguntaAleatoria);
      }
    }

    setPreguntasExamen(shuffleArray(seleccionadas.slice(0, EXAM_QUESTIONS_COUNT)));
    setVista("examen");
    setIndex(0);
    setRespuestas({});
    setFinalizado(false);
    setMostrarFeedback(false);
    setTiempoRestante(EXAM_TIME_MINUTES * 60);
  };

  const iniciarPractica = () => {
    setVista("practica");
    setIndex(0);
    setRespuestas({});
    setFinalizado(false);
    setMostrarFeedback(false);
  };

  const iniciarFlashcards = () => {
    setVista("flashcards");
    setIndex(0);
    setMostrarRespuesta(false);
  };

  const toggleSeleccion = (num, opcion, multiple) => {
    if (multiple) {
      const current = respuestas[num] || [];
      const updated = current.includes(opcion)
        ? current.filter(o => o !== opcion)
        : [...current, opcion];
      setRespuestas({ ...respuestas, [num]: updated });
    } else {
      setRespuestas({ ...respuestas, [num]: opcion });
    }
  };

  const esCorrecta = (q) => {
    const r = respuestas[q.numero];
    if (Array.isArray(q.respuesta)) {
      return Array.isArray(r) && r.sort().join() === q.respuesta.sort().join();
    }
    return r === q.respuesta;
  };

  const borrarDelHistorial = (index) => {
    const nuevoHistorial = historial.filter((_, i) => i !== index);
    setHistorial(nuevoHistorial);
  };
  
  const wrapCentered = (children) => (
    <div className={`p-4 sm:p-8 min-h-screen flex flex-col items-center ${colores.fondo}`}>
      <div className="w-full flex justify-start mb-4">
        <BackButton onClick={() => setVista("menu")} />
      </div>
      <div className="w-full max-w-4xl flex flex-col items-center px-4 sm:px-0">{children}</div>
    </div>
  );



  switch(vista){
    case "menu": return <Menu iniciarExamen={iniciarExamen} iniciarPractica={iniciarPractica} iniciarFlashcards={iniciarFlashcards} setVista={setVista} />;
    case "practica": return <Practice preguntas={preguntas} index={index} colores={colores} cardStyle={cardStyle} wrapCentered={wrapCentered} setMostrarFeedback={setMostrarFeedback} setIndex={setIndex} mostrarFeedback={mostrarFeedback} vista={vista} preguntasExamen={preguntasExamen} respuestas={respuestas} toggleSeleccion={toggleSeleccion} />;
    case "flashcards": return <Flashcards preguntas={preguntas} index={index} colores={colores} wrapCentered={wrapCentered} setIndex={setIndex} mostrarRespuesta={mostrarRespuesta} setMostrarRespuesta={setMostrarRespuesta} />;
    case "examen": return <Exam finalizado={finalizado} preguntasExamen={preguntasExamen} esCorrecta={esCorrecta} colores={colores} cardStyle={cardStyle} wrapCentered={wrapCentered} index={index} tiempoRestante={tiempoRestante} setMostrarFeedback={setMostrarFeedback} setIndex={setIndex} setFinalizado={setFinalizado} setHistorial={setHistorial} historial={historial} vista={vista} preguntas={preguntas} respuestas={respuestas} toggleSeleccion={toggleSeleccion} mostrarFeedback={mostrarFeedback} />;
    case "historial": return <History historial={historial} colores={colores} wrapCentered={wrapCentered} borrarDelHistorial={borrarDelHistorial} />;
    default: return <Menu iniciarExamen={iniciarExamen} iniciarPractica={iniciarPractica} iniciarFlashcards={iniciarFlashcards} setVista={setVista} />;
  }
}