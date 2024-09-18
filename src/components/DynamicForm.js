import React from 'react'
import useThreadInfo from '../hooks/useThreadInfo'
import Question from './Question'

const DynamicForm = () => {
  const { threadData, loading, error } = useThreadInfo()

  if (loading) return <p>Cargando datos...</p>
  if (error) return <p>Error: {error}</p>

  const form = threadData?.agreement?.forms?.[0]

  if (!form) return <p>No hay formulario disponible</p>

  const isClosed = threadData.closed

  return (
    <div className='thread-form-container'>
      <h2>{form.title}</h2> 

      {form.questions.map((question) => (
        <div className='thread-form' key={question.qid} style={{ opacity: isClosed ? 0.5 : 1 }}>
          <Question question={question} disabled={isClosed} />
        </div>
      ))}
    </div>
  )
}

export default DynamicForm
