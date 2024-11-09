'use client'

import React, { useState } from 'react'

// TeacherForm Component
const TeacherForm = ({ addTeacher }) => {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !role) return
    addTeacher({ id: Date.now(), name, role, evidence: [] })
    setName('')
    setRole('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Nombre del maestro"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="mr-2 p-2 border rounded"
      >
        <option value="">Seleccionar rol</option>
        <option value="Tutor">Tutor</option>
        <option value="Docente">Docente</option>
        <option value="Ambos">Ambos</option>
      </select>
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Agregar Maestro
      </button>
    </form>
  )
}

// EvidenceForm Component
const EvidenceForm = ({ addEvidence }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description) return
    addEvidence({ id: Date.now(), title, description })
    setTitle('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Título de la evidencia"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-green-500 text-white rounded">
        Agregar Evidencia
      </button>
    </form>
  )
}

// EvidenceList Component
const EvidenceList = ({ evidence }) => (
  <ul className="list-disc pl-5">
    {evidence.map((item) => (
      <li key={item.id} className="mb-2">
        <strong>{item.title}</strong>: {item.description}
      </li>
    ))}
  </ul>
)

// TeacherList Component
const TeacherList = ({ teachers, addEvidence }) => (
  <div>
    {teachers.map((teacher) => (
      <div key={teacher.id} className="mb-4 p-4 border rounded">
        <h3 className="text-xl font-bold">{teacher.name}</h3>
        <p>Rol: {teacher.role}</p>
        <h4 className="mt-2 font-semibold">Evidencias:</h4>
        <EvidenceList evidence={teacher.evidence} />
        <EvidenceForm
          addEvidence={(evidence) =>
            addEvidence(teacher.id, evidence)
          }
        />
      </div>
    ))}
  </div>
)

// Main App Component
export default function TutoringApp() {
  const [teachers, setTeachers] = useState([])

  const addTeacher = (teacher) => {
    setTeachers([...teachers, teacher])
  }

  const addEvidence = (teacherId, evidence) => {
    setTeachers(
      teachers.map((teacher) =>
        teacher.id === teacherId
          ? { ...teacher, evidence: [...teacher.evidence, evidence] }
          : teacher
      )
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">TESChi Sistema de Tutorías</h1>
      <TeacherForm addTeacher={addTeacher} />
      <TeacherList teachers={teachers} addEvidence={addEvidence} />
    </div>
  )
}