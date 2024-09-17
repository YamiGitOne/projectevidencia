import React from 'react'

const ThreadStatus = ({ status }) => {
  if (!status) return <p>No hay estado disponible.</p>

  return (
    <div>
      <h2>Estado del Hilo</h2>
      <p>{status === 'accepted' ? 'Aceptado' : 'Pendiente de aceptación'}</p>
    </div>
  )
}

export default ThreadStatus
