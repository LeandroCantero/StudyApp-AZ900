import React, { useState, useEffect } from "react";
import preguntasJson from './preguntas_respuestas_numeradas_orden.json';
import Menu from './components/Menu';
import BackButton from './components/common/BackButton';
import Practice from './components/Practice'
import Exam from './components/Exam';
import Flashcards from './components/Flashcards';
import History from './components/History';
import { useShuffle } from './hooks/useShuffle';
import { colores, cardStyle } from './constants';
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
    const seleccionadas = shuffleArray(preguntas).slice(0, EXAM_QUESTIONS_COUNT);
    setPreguntasExamen(seleccionadas);
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
    const r = respuestas[q.Numero];
    if (Array.isArray(q.Respuesta)) {
      return Array.isArray(r) && r.sort().join() === q.Respuesta.sort().join();
    }
    return r === q.Respuesta;
  };


  
  const wrapCentered = (children) => (
    <div className={`p-8 min-h-screen relative flex flex-col items-center justify-start ${colores.fondo}`}>
      <BackButton onClick={() => setVista("menu")} />
      <div style={{width:'100%', display:'flex', justifyContent:'center'}}>{children}</div>
    </div>
  );



  switch(vista){
    case "menu": return <Menu iniciarExamen={iniciarExamen} iniciarPractica={iniciarPractica} iniciarFlashcards={iniciarFlashcards} setVista={setVista} />;
    case "practica": return <Practice preguntas={preguntas} index={index} colores={colores} cardStyle={cardStyle} wrapCentered={wrapCentered} setMostrarFeedback={setMostrarFeedback} setIndex={setIndex} mostrarFeedback={mostrarFeedback} vista={vista} preguntasExamen={preguntasExamen} respuestas={respuestas} toggleSeleccion={toggleSeleccion} />;
    case "flashcards": return <Flashcards preguntas={preguntas} index={index} colores={colores} wrapCentered={wrapCentered} setIndex={setIndex} mostrarRespuesta={mostrarRespuesta} setMostrarRespuesta={setMostrarRespuesta} />;
    case "examen": return <Exam finalizado={finalizado} preguntasExamen={preguntasExamen} esCorrecta={esCorrecta} colores={colores} cardStyle={cardStyle} wrapCentered={wrapCentered} index={index} tiempoRestante={tiempoRestante} setMostrarFeedback={setMostrarFeedback} setIndex={setIndex} setFinalizado={setFinalizado} setHistorial={setHistorial} historial={historial} vista={vista} preguntas={preguntas} respuestas={respuestas} toggleSeleccion={toggleSeleccion} mostrarFeedback={mostrarFeedback} />;
    case "historial": return <History historial={historial} colores={colores} wrapCentered={wrapCentered} />;
    default: return <Menu iniciarExamen={iniciarExamen} iniciarPractica={iniciarPractica} iniciarFlashcards={iniciarFlashcards} setVista={setVista} />;
  }
}