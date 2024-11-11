'use client'

import React, { useState, useEffect } from 'react'

// TeacherForm Component
const TeacherForm = ({ addTeacher }) => {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [subjects, setSubjects] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !role) return
    addTeacher({ id: Date.now(), name, role, subjects, evidence: [] })
    setName('')
    setRole('')
    setSubjects('')
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
      <input
        type="text"
        placeholder="Materias"
        value={subjects}
        onChange={(e) => setSubjects(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        Agregar Maestro
      </button>
    </form>
  )
}

// Evidence Form Component for Teachers (with file upload)
const EvidenceForm = ({ addEvidence, teacherId }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [subject, setSubject] = useState('')
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title || !description || !type || !subject || !file) return
    const fileUrl = URL.createObjectURL(file)  // Generates URL for the uploaded file
    const timestamp = new Date().toLocaleString()
    addEvidence({ id: Date.now(), title, description, type, subject, fileUrl, fileName: file.name, timestamp }, teacherId)
    setTitle('')
    setDescription('')
    setType('')
    setSubject('')
    setFile(null)
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
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Tipo de evidencia (ej. prueba, tarea, proyecto)"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Materia"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="mr-2 p-2 border rounded"
      />
      <input
        type="file"
        onChange={handleFileChange}
        className="mr-2 p-2 border rounded"
      />
      <button type="submit" className="p-2 bg-green-500 text-white rounded">
        Agregar Evidencia
      </button>
    </form>
  )
}

// Evidence List with File Preview and Download
const EvidenceList = ({ evidence }) => (
  <ul className="list-disc pl-5">
    {evidence.map((item) => (
      <li key={item.id} className="mb-2">
        <strong>{item.title}</strong> ({item.type}) - Materia: {item.subject}
        <p>{item.description}</p>
        <a href={item.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          Ver evidencia
        </a>
        <p>Subido el: {item.timestamp}</p>
        <p>Archivo: {item.fileName}</p>
      </li>
    ))}
  </ul>
)

// Modified TeacherList Component
const TeacherList = ({ teachers, addEvidence, filterRole }) => (
  <div>
    <p className="mb-4 text-sm text-gray-600">Nota: La mayoría de las clases son presenciales, con sesiones en línea ocasionales.</p>
    {teachers
      .filter((teacher) => (filterRole ? teacher.role === filterRole : true))
      .map((teacher) => (
        <div key={teacher.id} className="mb-4 p-4 border rounded">
          <h3 className="text-xl font-bold">{teacher.name}</h3>
          <p>Rol: {teacher.role}</p>
          <p>Materias: {teacher.subjects}</p>
          <h4 className="mt-2 font-semibold">Evidencias:</h4>
          <EvidenceList evidence={teacher.evidence} />
          <EvidenceForm addEvidence={addEvidence} teacherId={teacher.id} />
        </div>
    ))}
  </div>
)

// New TroubleStudentsList Component
const TroubleStudentsList = ({ students }) => (
  <div className="mt-4">
    <h3 className="text-xl font-bold mb-2">Estudiantes en Riesgo</h3>
    <ul className="list-disc pl-5">
      {students.map((student) => (
        <li key={student.id} className="mb-2">
          <strong>{student.name}</strong> - Promedio: {student.averageGrade}
        </li>
      ))}
    </ul>
  </div>
)

// Assignment List Component
const AssignmentList = ({ assignments }) => (
  <ul className="list-disc pl-5">
    {assignments.map((assignment) => (
      <li key={assignment.id} className="mb-2">
        <strong>{assignment.title}</strong> - Fecha de entrega: {assignment.dueDate}
      </li>
    ))}
  </ul>
)

export default function TutoringManagementSystem() {
  const [teachers, setTeachers] = useState([])
  const [filterRole, setFilterRole] = useState('')
  const [troubleStudents, setTroubleStudents] = useState([])

  // Function to add a new teacher
  const addTeacher = (teacher) => setTeachers((prev) => [...prev, teacher])

  // Function to add evidence to a teacher
  const addEvidence = (evidenceItem, teacherId) => {
    setTeachers((prevTeachers) =>
      prevTeachers.map((teacher) =>
        teacher.id === teacherId ? { ...teacher, evidence: [...teacher.evidence, evidenceItem] } : teacher
      )
    )
  }

  const fetchTroubleStudents = async () => {
    try {
      // Simulating an API call to a user database
      const response = await fetch('/api/trouble-students')
      const data = await response.json()
      setTroubleStudents(data.filter(student => student.averageGrade < 70))
    } catch (error) {
      console.error('Error fetching trouble students:', error)
    }
  }

  // Use effect to fetch trouble students on component mount
  useEffect(() => {
    fetchTroubleStudents()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Sistema de Gestión de Tutorías</h1>

      {/* Role Filter */}
      <div className="mb-4">
        <label>Filtrar por Rol:</label>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">Todos</option>
          <option value="Tutor">Tutor</option>
          <option value="Docente">Docente</option>
          <option value="Ambos">Ambos</option>
        </select>
      </div>
      
      {/* Form to add a teacher */}
      <TeacherForm addTeacher={addTeacher} />
      
      {/* Displaying the list of teachers with their evidences */}
      <TeacherList teachers={teachers} addEvidence={addEvidence} filterRole={filterRole} />

      <TroubleStudentsList students={troubleStudents} />
    </div>
  )
}