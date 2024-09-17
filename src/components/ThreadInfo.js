import React from 'react'
import useThreadInfo from '../hooks/useThreadInfo'
import ThreadDetails from './ThreadDetails'
import '../styles/ThreadHeader.scss'

const ThreadInfo = () => {
  const { threadData, loading, error } = useThreadInfo()

  if (loading) return <p>Cargando datos...</p>
  if (error) return <p>Error: {error}</p>

  if (!threadData) {
    return <p>No hay datos disponibles</p>
  }

  return (
    <div>
      <h1>Información del Hilo</h1>
      <ThreadDetails details={threadData.details} />

      <div>
        <h2>Contenido del Hilo</h2>
        <div
          dangerouslySetInnerHTML={{ __html: threadData.content }}
          style={{ padding: '10px', border: '1px solid #ddd', marginTop: '20px' }}
        />
      </div>
    </div>
  )
}

export default ThreadInfo
