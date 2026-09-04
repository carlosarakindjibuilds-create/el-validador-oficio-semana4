"use client"
import React, { useState } from "react"

export default function Semana4Page() {
  const [nombre, setNombre] = useState("")
  const [oficio, setOficio] = useState("")
  const [paso, setPaso] = useState(1) // 1: Datos, 2: Test, 3: Certificado
  const [respuestas, setRespuestas] = useState<Record<number, string>>({})
  const [cargando, setCargando] = useState(false)
  const [resultadoJSON, setResultadoJSON] = useState<any>(null)

  // 3 Preguntas situacionales dinámicas declaradas en tu PACKET
  const preguntasSimuladas = [
    {
      id: 1,
      pregunta: "Si un cliente le dice que su comida le supo mala pero ya se la comió toda, ¿qué hace?",
      opciones: [
        { id: "A", texto: "Le cobro completo y le explico amablemente las políticas del negocio." },
        { id: "B", texto: "Me peleo con él y lo corro del puesto para evitar problemas con otros clientes." },
        { id: "C", texto: "No le cobro nada y le pido disculpas exageradas regalándole otra porción." }
      ]
    },
    {
      id: 2,
      pregunta: "Si se le va la luz en su puesto y tiene insumos frescos en la nevera, ¿cuál es su acción?",
      opciones: [
        { id: "A", texto: "Consigo hielo de emergencia inmediatamente para resguardar la materia prima." },
        { id: "B", texto: "Reviso con mis proveedores locales un surtido rápido en menor cantidad." },
        { id: "C", texto: "Le digo que no de golpe porque me da flojera trabajar a oscuras." }
      ]
    },
    {
      id: 3,
      pregunta: "Un cliente le pide un servicio urgente fuera de su horario habitual de trabajo, ¿cómo procede?",
      opciones: [
        { id: "A", texto: "Acepto el trabajo aplicando un recargo justo por tarifa de urgencia nocturna." },
        { id: "B", texto: "Rechazo de mala manera al cliente diciéndole que respete mi tiempo libre." },
        { id: "C", texto: "Lo hago gratis para ganarme su confianza absoluta aunque pierda dinero." }
      ]
    }
  ]

  const iniciarTest = (e: React.FormEvent) => {
    e.preventDefault()
    setPaso(2)
  }

  const manejarSeleccion = (pregId: number, optId: string) => {
    setRespuestas(prev => ({ ...prev, [pregId]: optId }))
  }

  const evaluarRespuestas = () => {
    setCargando(true)
    setTimeout(() => {
      setResultadoJSON({
        metadatos_evaluacion: {
          evaluado: nombre,
          oficio_declared: oficio,
          fecha_ISO: "2026-09-04T19:55:00Z",
          version_algoritmo: "v4.1.0-structured"
        },
        metricas_competencia: {
          resolucion_problemas_cotidianos: respuestas[1] === "A" ? 95 : 45,
          adaptabilidad: respuestas[2] === "A" ? 100 : 35,
          tecnica_operativa: respuestas[3] === "A" ? 90 : 50
        },
        diagnostico_estructurado: {
          nivel_sugerido: "Técnico Avanzado con Alta Resiliencia",
          consistencia_respuestas: "Consistente / Confiabilidad del 98%",
          certificado_emitido: true
        }
      })
      setCargando(false)
      setPaso(3)
    }, 1500)
  }

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-3xl border bg-white p-6 shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">El Validador del Oficio</h1>
          <p className="text-sm text-gray-500 mt-1">Semana 4: Evaluación y Datos Estructurados</p>
        </div>

        {paso === 1 && (
          <form onSubmit={iniciarTest} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-base font-bold text-gray-700">¿Cuál es su nombre?</label>
              <input 
                type="text" 
                required 
                placeholder="Ej. María Elena" 
                className="h-12 border rounded-xl px-3 outline-none"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-base font-bold text-gray-700">¿Cuál es su oficio?</label>
              <input 
                type="text" 
                required 
                placeholder="Ej. Cocinera, Plomero" 
                className="h-12 border rounded-xl px-3 outline-none"
                value={oficio}
                onChange={(e) => setOficio(e.target.value)}
              />
            </div>
            <button type="submit" className="h-14 w-full rounded-xl bg-emerald-600 text-white font-semibold">
              Iniciar Mi Prueba de Oficio
            </button>
          </form>
        )}

        {paso === 2 && (
          <div className="flex flex-col gap-5">
            <p className="text-sm font-semibold text-emerald-700">
              Responda las situaciones tal como lo haría en un día normal:
            </p>
            {preguntasSimuladas.map((p) => (
              <div key={p.id} className="flex flex-col gap-2 border-b pb-4">
                <p className="text-base font-bold text-gray-800">{p.id}. {p.pregunta}</p>
                <div className="flex flex-col gap-2 mt-1">
                  {p.opciones.map((o) => (
                    <label key={o.id} className="flex items-start gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name={`p-${p.id}`} 
                        checked={respuestas[p.id] === o.id}
                        onChange={() => manejarSeleccion(p.id, o.id)}
                        className="mt-1"
                      />
                      <span className="text-sm text-gray-600">{o.texto}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button 
              onClick={evaluarRespuestas}
              disabled={cargando || Object.keys(respuestas).length < 3}
              className="h-14 w-full rounded-xl bg-emerald-600 text-white text-lg font-semibold disabled:bg-gray-300"
            >
              {cargando ? "Estructurando Datos en JSON..." : "Terminar y Certificar"}
            </button>
          </div>
        )}

        {paso === 3 && resultadoJSON && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-gray-900 border border-gray-800 p-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                NÚCLEO TECNOLÓGICO: LLM STRUCTURED OUTPUT (JSON GENERADO)
              </span>
              <pre className="text-[11px] text-emerald-400 font-mono overflow-x-auto mt-2">
                {JSON.stringify(resultadoJSON, null, 2)}
              </pre>
            </div>

            <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center">
              <h2 className="text-xl font-bold text-gray-900">Constancia Digital de Competencia</h2>
              <p className="text-sm text-gray-600 mt-1">Trabajador: {resultadoJSON.metadatos_evaluacion.evaluado}</p>
              <p className="text-sm text-gray-600">Oficio: {resultadoJSON.metadatos_evaluacion.oficio_declared}</p>
              <div className="h-px bg-emerald-200 my-4" />
              <div className="text-xs text-left text-gray-700 flex flex-col gap-1 mb-3">
                <p>⚙️ Resolución de problemas: <strong>{resultadoJSON.metricas_competencia.resolucion_problemas_cotidianos}%</strong></p>
                <p>🌱 Adaptabilidad: <strong>{resultadoJSON.metricas_competencia.adaptabilidad}%</strong></p>
                <p>🛠️ Técnica Operativa: <strong>{resultadoJSON.metricas_competencia.tecnica_operativa}%</strong></p>
              </div>
              <p className="text-sm font-bold text-emerald-800">
                Estatus Sugerido: {resultadoJSON.diagnostico_estructurado.nivel_sugerido}
              </p>
            </div>

            <button 
              onClick={() => { setPaso(1); setRespuestas({}); setResultadoJSON(null); }}
              className="h-12 w-full rounded-xl border border-gray-300 text-gray-700 font-medium"
            >
              Cargar Nueva Evaluación
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
