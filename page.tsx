"use client"

import React, { useState } from "react"

export default function Semana4Page() {
  const [nombre, setNombre] = useState("")
  const [oficio, setOficio] = useState("")
  const [paso, setPaso] = useState(1) // 1: Datos, 2: Test, 3: Certificado
  const [respuestas, setRespuestas] = useState<Record<number, string>>({})
  const [cargando, setCargando] = useState(false)
  const [resultadoJSON, setResultadoJSON] = useState<any>(null)

  // Preguntas situacionales estructuradas simuladas por IA (Semana 4)
  const preguntasSimuladas = [
    {
      id: 1,
      pregunta: "Si un cliente le dice que su comida le supo mala pero ya se la terminó toda, ¿usted qué hace?",
      opciones: [
        { id: "A", texto: "Le cobro completo y le explico amablemente que debió avisar al primer bocado." },
        { id: "B", texto: "Me peleo con él y lo corro del puesto para que no espante a la clientela." },
        { id: "C", texto: "No le cobro nada y le pido disculpas exageradas aunque pierda dinero." }
      ]
    },
    {
      id: 2,
      pregunta: "Si se le va la luz en su puesto y tiene insumos frescos que se pueden echar a perder en pocas horas, ¿cuál es su acción?",
      opciones: [
        { id: "A", texto: "Dejo las cosas ahí guardadas y espero a que regrese la luz cruzado de brazos." },
        { id: "B", texto: "Consigo hielo de emergencia inmediatamente y priorizo la venta de lo más delicado." },
        { id: "C", texto: "Sigo vendiendo la comida sin importar si perdió refrigeración o frescura." }
      ]
    },
    {
      id: 3,
      pregunta: "Un cliente le pide un pedido muy grande para una fiesta mañana temprano pero usted no tiene suficiente materia prima hoy, ¿qué decide?",
      opciones: [
        { id: "A", texto: "Le digo que sí, le cobro anticipo y mañana le entrego lo que me alcance a salir." },
        { id: "B", texto: "Reviso con mis proveedores locales un surtido exprés nocturno y organizo mi producción si el margen da ganancia." },
        { id: "C", texto: "Le digo que no de golpe porque me da flojera trabajar de noche." }
      ]
    }
  ]

  const iniciarTest = (e: React.FormEvent) => {
    e.preventDefault()
    setPaso(2)
  }

  const evaluarRespuestas = () => {
    setCargando(true)
    
    // Simulación del procesamiento del LLM para estructurar los datos en un esquema JSON (Métrica de la semana)
    setTimeout(() => {
      setResultadoJSON({
        metadatos_evaluacion: {
          evaluado: nombre,
          oficio_declarado: oficio,
          fecha_ISO: "2026-09-04T19:55:00Z",
          version_algoritmo: "v4.1.0-structured"
        },
        metricas_competencia: {
          resolucion_problemas: respuestas[1] === "A" ? 95 : 40,
          gestion_de_crisis: respuestas[2] === "B" ? 100 : 30,
          capacidad_negocio: respuestas[3] === "B" ? 90 : 50
        },
        diagnostico_estructurado: {
          puntaje_general_porcentaje: respuestas[1] === "A" && respuestas[2] === "B" && respuestas[3] === "B" ? 95 : 60,
          nivel_sugerido: "Técnico Avanzado con Alta Resiliencia",
          consistencia_respuestas: "Consistente / Confiabilidad del 98%"
        }
      })
      setCargando(false)
      setPaso(3)
    }, 1500)
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-5 py-10" style={{ fontFamily: 'sans-serif' }}>
      <div className="w-full max-w-md rounded-3xl border bg-white p-6 shadow-sm">
        
        {/* Encabezado */}
        <div className="text-center mb-6">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-2 font-bold text-2xl">📊</div>
          <h1 className="text-2xl font-bold text-gray-900">El Validador del Oficio</h1>
          <p className="text-sm text-gray-500 mt-1">Semana 4: Evaluación y Datos Estructurados</p>
        </div>

        {/* PASO 1: REGISTRO INICIAL */}
        {paso === 1 && (
          <form onSubmit={iniciarTest} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-base font-bold text-gray-700">¿Cuál es su nombre?</label>
              <input type="text" required placeholder="Ej. María Elena Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)} className="h-12 w-full rounded-xl border border-gray-300 px-4 text-base focus:outline-emerald-500"/>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-base font-bold text-gray-700">¿Cuál es su oficio?</label>
              <input type="text" required placeholder="Ej. Cocinera, Plomero" value={oficio} onChange={(e) => setOficio(e.target.value)} className="h-12 w-full rounded-xl border border-gray-300 px-4 text-base focus:outline-emerald-500"/>
            </div>
            <button type="submit" className="h-14 w-full rounded-xl bg-emerald-600 text-lg font-bold text-white shadow-md hover:bg-emerald-700 transition-all mt-2">
              Iniciar Mi Prueba de Oficio
            </button>
          </form>
        )}

        {/* PASO 2: FORMULARIO INTERACTIVO (PREGUNTAS SITUACIONALES) */}
        {paso === 2 && (
          <div className="flex flex-col gap-5">
            <p className="text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
              Responda las situaciones tal como lo haría en un día normal de su trabajo.
            </p>
            
            {preguntasSimuladas.map((p) => (
              <div key={p.id} className="flex flex-col gap-2 border-b pb-4">
                <p className="text-base font-bold text-gray-800">{p.id}. {p.pregunta}</p>
                <div className="flex flex-col gap-2 mt-1">
                  {p.opciones.map((o) => (
                    <label key={o.id} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${respuestas[p.id] === o.id ? 'border-emerald-500 bg-emerald-50/50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input 
                        type="radio" 
                        name={`p-${p.id}`} 
                        required 
                        checked={respuestas[p.id] === o.id}
                        onChange={() => setRespuestas({ ...respuestas, [p.id]: o.id })}
                        className="mt-1 accent-emerald-600"
                      />
                      <span className="text-sm text-gray-700 font-medium">{o.texto}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <button 
              onClick={evaluarRespuestas}
              disabled={cargando || Object.keys(respuestas).length < 3}
              className="h-14 w-full rounded-xl bg-emerald-600 text-lg font-bold text-white shadow-md hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all mt-2"
            >
              {cargando ? "Estructurando Datos en JSON..." : "Terminar y Certificar"}
            </button>
          </div>
        )}

        {/* PASO 3: CONSTANCIA CON SALIDA DE DATOS ESTRUCTURADOS (JSON) */}
        {paso === 3 && resultadoJSON && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-4 text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-1 rounded border border-emerald-800 block text-center mb-3">
                NÚCLEO TECNOLÓGICO: LLM STRUCTURED OUTPUT (JSON GENERADO)
              </span>
              <pre className="text-[11px] text-emerald-400 font-mono overflow-x-auto whitespace-pre-wrap">
                {JSON.stringify(resultadoJSON, null, 2)}
              </pre>
            </div>

            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
              <h2 className="text-xl font-bold text-gray-900 text-center">Constancia de Competencia Laboral</h2>
              <p className="text-sm text-center text-gray-600 mt-1">Avalado para: <strong className="text-gray-900">{resultadoJSON.metadatos_evaluacion.evaluado}</strong></p>
              <p className="text-sm text-center text-gray-600">Oficio: <strong className="text-gray-900">{resultadoJSON.metadatos_evaluacion.oficio_declarated ?? oficio}</strong></p>
              
              <div className="h-px bg-emerald-200 my-4" />
              
              <div className="flex flex-col gap-2">
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 mb-1"><span>Resolución de Problemas:</span><span>{resultadoJSON.metricas_competencia.resolucion_problemas}%</span></div>
                  <div className="w-full bg-gray-200 h-2 rounded-full"><div class="bg-emerald-600 h-2 rounded-full" style={{ width: `${resultadoJSON.metricas_competencia.resolucion_problemas}%` }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold text-gray-700 mb-1"><span>Gestión de Crisis:</span><span>{resultadoJSON.metricas_competencia.gestion_de_crisis}%</span></div>
                  <div className="w-full bg-gray-200 h-2 rounded-full"><div class="bg-emerald-600 h-2 rounded-full" style={{ width: `${resultadoJSON.metricas_competencia.gestion_de_crisis}%` }}></div></div>
                </div>
              </div>

              <p className="text-sm font-bold text-emerald-800 mt-4 text-center">
                Estatus Sugerido: {resultadoJSON.diagnostico_structured.nivel_sugerido}
              </p>
            </div>

            <button 
              onClick={() => { setPaso(1); setRespuestas({}); setResultadoJSON(null); }}
              className="h-12 w-full rounded-xl border border-gray-300 text-base font-semibold text-gray-700 bg-white hover:bg-gray-50"
            >
