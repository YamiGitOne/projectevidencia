import React from 'react'

const ThreadParticipants = ({ participants }) => {
  if (!participants || participants.length === 0) return <p>No hay participantes disponibles.</p>

  return (
    <div>
      <h2>Participantes del Hilo</h2>
      <ul>
      {threadData.participants.map((participant, index) => (
  <ThreadParticipant key={participant.id || index} {...participant} />
))}
      </ul>
    </div>
  )
}

export default ThreadParticipants
