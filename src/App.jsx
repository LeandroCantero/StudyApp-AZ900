import React, { useState, useEffect } from "react";
import preguntasJson from './preguntas_respuestas_numeradas_orden.json';

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function App({ preguntas = preguntasJson }) {
  const [vista, setVista] = useState("menu");
  const [index, setIndex] = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [finalizado, setFinalizado] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [preguntasExamen, setPreguntasExamen] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(45*60);

  const colores = {
    fondo: "bg-[#0d1b2a] text-[#e0e1dd]",
    card: "bg-[#1b263b] text-[#e0e1dd] border border-[#415a77]",
    btn: "px-6 py-3 rounded-lg text-lg font-semibold cursor-pointer transition-transform duration-200 hover:scale-105",
  };

  useEffect(()=>{
    let timer;
    if(vista==="examen" && !finalizado){
      timer = setInterval(()=>{
        setTiempoRestante((prev)=>{
          if(prev<=1){
            clearInterval(timer);
            setFinalizado(true);
            return 0;
          }
          return prev-1;
        });
      },1000);
    }
    return ()=> clearInterval(timer);
  },[vista, finalizado]);

  const iniciarExamen = () => {
    const seleccionadas = shuffleArray(preguntas).slice(0,36);
    setPreguntasExamen(seleccionadas);
    setVista("examen");
    setIndex(0);
    setRespuestas({});
    setFinalizado(false);
    setMostrarFeedback(false);
    setTiempoRestante(45*60);
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

  const renderBackButton = () => (
    <button
      type="button"
      className="fixed top-6 left-6 bg-[#778da9] hover:bg-[#e0e1dd] text-[#0d1b2a] px-6 py-2 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 hover:cursor-pointer text-2xl font-bold border border-[#0d1b2a]"
      onClick={() => setVista("menu")}
    >
      ←
    </button>
  );

  const renderOpciones = (q, modo, review = false) => {
    const multiple = Array.isArray(q.Respuesta);
    const selected = respuestas[q.Numero];

    return q.Opciones.map(op => {
      const isSelected = multiple ? (selected || []).includes(op) : selected === op;
      const isCorrect = Array.isArray(q.Respuesta) ? q.Respuesta.includes(op) : q.Respuesta === op;

      let highlight = "";
      if (review) {
        if (isCorrect) highlight = "bg-green-500/30";
        if (isSelected && !isCorrect) highlight = "bg-red-500/30";
      } else if (mostrarFeedback && isCorrect && q.Numero === (vista==="examen"?preguntasExamen[index].Numero:preguntas[index].Numero)) {
        highlight = "bg-green-500/30";
      }

      return (
        <label
          key={op}
          className={`flex items-center mb-3 p-4 rounded-xl hover:bg-[#34485f] cursor-pointer text-xl w-full transition-colors duration-200 ${highlight}`}
        >
          <input
            type={multiple ? "checkbox" : "radio"}
            name={`${modo}_${q.Numero}`}
            className={`mr-4 w-6 h-6 accent-[#778da9] rounded-full cursor-pointer ${isSelected ? 'bg-[#778da9]' : ''}`}
            checked={isSelected}
            onChange={() => toggleSeleccion(q.Numero, op, multiple)}
            disabled={review}
          />
          {op}
        </label>
      );
    });
  };

  const renderImagen = (q) => {
    if (!q.Imagen) return null;
    return (
      <img 
        src={q.Imagen} 
        alt={`Pregunta ${q.Numero}`} 
        className="mt-6 rounded-xl shadow-lg max-w-3xl w-full object-contain"
      />
    );
  };

  const wrapCentered = (children) => (
    <div className={`p-8 min-h-screen relative flex flex-col items-center justify-start ${colores.fondo}`}>
      {renderBackButton()}
      <div style={{width:'100%', display:'flex', justifyContent:'center'}}>{children}</div>
    </div>
  );

  const cardStyle = { minHeight:'250px', width:'768px' };

  const renderExamen = () => {
    const lista = preguntasExamen;
    if(finalizado){
      const correctas = lista.filter(q=>esCorrecta(q));
      return wrapCentered(<div>
        <h2 className="text-3xl font-bold mb-10">Examen Finalizado</h2>
        <p className="mb-10 text-2xl font-semibold">Nota: {((correctas.length/lista.length)*100).toFixed(2)}%</p>
        <div className="space-y-4 w-full flex flex-col items-center">
          {lista.map(q => (
            <div key={q.Numero} className={`p-6 rounded-xl ${colores.card} shadow-lg`} style={cardStyle}>
              <p className="mb-2 text-xl font-semibold">{q.Numero}. {q.Pregunta}</p>
              {renderOpciones(q,"review", true)}
              {renderImagen(q)}
            </div>
          ))}
        </div>
      </div>);
    }

    const q = lista[index];
    const minutos = Math.floor(tiempoRestante/60);
    const segundos = (tiempoRestante%60).toString().padStart(2,'0');
    return wrapCentered(<div>
      <div className="flex justify-between items-center mb-4 w-full max-w-4xl">
        <h2 className="text-3xl font-bold">Pregunta {index+1} de {lista.length}</h2>
        <p className="text-xl">⏱ {minutos}:{segundos}</p>
      </div>
      <div className={`p-6 rounded-xl mb-6 ${colores.card} shadow-xl flex flex-col`} style={cardStyle}>
        <p className="font-bold mb-4 text-xl">{q.Pregunta}</p>
        {renderOpciones(q,"examen")}
        <div className="flex justify-end mt-4">
          <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9]`} onClick={()=>{
            setMostrarFeedback(false);
            if(index<lista.length-1){
              setIndex(index+1);
            }else{
              setFinalizado(true);
              setHistorial([{fecha:new Date().toLocaleString(),nota:((lista.filter(q=>esCorrecta(q)).length/lista.length)*100).toFixed(2)},...historial]);
            }
          }}>Siguiente</button>
        </div>
      </div>
      {renderImagen(q)}
    </div>);
  };

  const renderMenu = () => (
    <div className={`p-8 space-y-6 min-h-screen flex flex-col justify-center items-center ${colores.fondo}`}>
      <h1 className="text-5xl font-extrabold mb-16">App de Práctica AZ-900</h1>
      <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] w-72`} onClick={iniciarExamen}>Examen</button>
      <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] w-72`} onClick={iniciarPractica}>Práctica</button>
      <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] w-72`} onClick={iniciarFlashcards}>Flashcards</button>
      <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] w-72`} onClick={()=>setVista("historial")}>Historial</button>
    </div>
  );

  const renderPractica = () => {
    const q = preguntas[index];
    return wrapCentered(<div>
      <h2 className="text-3xl font-bold mb-10">Práctica - Pregunta {index + 1} de {preguntas.length}</h2>
      <div className={`p-6 rounded-xl mb-6 ${colores.card} shadow-xl flex flex-col`} style={cardStyle}>
        <p className="font-bold mb-4 text-xl">{q.Pregunta}</p>
        {renderOpciones(q, "pract")}
        <div className="flex justify-between mt-6 items-center">
          <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9]`} onClick={() => setMostrarFeedback(prev=>!prev)}>Comprobar</button>
          <div className="space-x-4 flex">
            <button type="button" disabled={index===0} className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9]`} onClick={()=>{setIndex(index-1);setMostrarFeedback(false);}}>Anterior</button>
            <button type="button" className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9]`} onClick={()=>{setIndex(index+1);setMostrarFeedback(false);}}>Siguiente</button>
          </div>
        </div>
      </div>
      {renderImagen(q)}
    </div>);
  };

  const renderFlashcards = () => {
    const q = preguntas[index];
    return wrapCentered(<div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold mb-6">Flashcard {index + 1}/{preguntas.length}</h2>
      <div className="flex justify-center mb-4 space-x-20">
        <button type="button" disabled={index===0} className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] disabled:opacity-50`} onClick={()=>{setIndex(index-1); setMostrarRespuesta(false);}}>←</button>
        <button type="button" disabled={index===preguntas.length-1} className={`${colores.btn} bg-[#415a77] hover:bg-[#778da9] disabled:opacity-50`} onClick={()=>{setIndex(index+1); setMostrarRespuesta(false);}}>→</button>
      </div>
      <div className={`p-8 rounded-xl mb-6 text-center ${colores.card} shadow-xl flex flex-col items-center cursor-pointer hover:bg-[#34485f]`} style={{minHeight:'350px', width:'768px'}} onClick={()=>setMostrarRespuesta(!mostrarRespuesta)}>
        <p className="font-bold text-2xl mb-4">{q.Pregunta}</p>
        <div style={{minHeight:'2rem'}}>
          {mostrarRespuesta && <p className="mt-4 text-green-400 font-bold text-xl">{Array.isArray(q.Respuesta) ? q.Respuesta.join(", ") : q.Respuesta}</p>}
        </div>
      </div>
      {renderImagen(q)}
    </div>);
  };

  const renderHistorial = () => wrapCentered(<div>
    <h2 className="text-3xl font-bold mb-10">Historial de Exámenes</h2>
    {historial.length===0 && <p className="text-xl">No hay intentos aún.</p>}
    <ul className="space-y-4 w-full max-w-3xl">
      {historial.map((h,i)=>(
        <li key={i} className={`p-4 rounded-xl ${colores.card} shadow-lg text-lg`}>
          {h.fecha} - Nota: {h.nota}%
        </li>
      ))}
    </ul>
  </div>);

  switch(vista){
    case "menu":return renderMenu();
    case "practica":return renderPractica();
    case "flashcards":return renderFlashcards();
    case "examen":return renderExamen();
    case "historial":return renderHistorial();
    default:return renderMenu();
  }
}