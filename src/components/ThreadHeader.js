import React, { useState } from 'react'
import useThreadInfo from '../hooks/useThreadInfo'
import '../styles/ThreadHeader.scss'

const ThreadHeader = () => {
  const { threadData, loading, error } = useThreadInfo()
  const [showHistory, setShowHistory] = useState(false)

  if (loading) return <p>Cargando datos...</p>
  if (error) return <p>Error: {error}</p>


  const latestStatus = threadData.history.length > 0 ? threadData.history[threadData.history.length - 1] : 'Sin historial'

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  return (
    <div className="thread-header">
      <div className="header-content">
        <p><strong>Código CFS:</strong> {threadData.cfscode || 'No disponible'}</p>
        <p><strong>Emisor:</strong> {threadData.sender?.user || 'Desconocido'}</p>
        <p><strong>Destinatario:</strong> {threadData.recipient?.address || 'Desconocido'}</p>
        <p>
          <strong>Estado más reciente:</strong> {latestStatus.status || 'Sin estados'}
          <button onClick={toggleHistory} style={{ marginLeft: '10px' }}>
            {showHistory ? 'Ocultar Historial' : 'Mostrar Historial'}
          </button>
        </p>
        {showHistory && (
          <ul>
            {threadData.history.map((status, index) => (
              <li key={index}>{status.status || 'Estado desconocido'}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ThreadHeader
