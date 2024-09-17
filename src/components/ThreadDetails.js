import React from 'react'

const ThreadDetails = ({ details }) => {
  if (!details) return <p>No hay detalles disponibles.</p>

  return (
    <div>
      <h2>Detalles del Hilo</h2>
      <p>ID del Hilo: {details.id}</p>
      <p>Fecha de Creación: {details.created_at}</p>
      <p>Estado de aceptación: {details.accepted ? 'Aceptado' : 'No aceptado'}</p>
      {/* Añade más información relevante según lo que devuelva la API */}
    </div>
  )
}

export default ThreadDetails
