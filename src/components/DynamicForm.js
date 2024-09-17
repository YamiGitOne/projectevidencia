import React from 'react'
import useThreadInfo from '../hooks/useThreadInfo'
import Question from './Question'

const DynamicForm = () => {
  const { threadData, loading, error } = useThreadInfo()

  if (loading) return <p>Cargando datos...</p>
  if (error) return <p>Error: {error}</p>

  const form = threadData?.agreement?.forms?.[0]

  if (!form) return <p>No hay formulario disponible</p>

  return (
    <div>
      <h2>{form.title}</h2> 

      {form.questions.map((question) => (
        <div key={question.qid}>
          <Question question={question} />
        </div>
      ))}
    </div>
  )
}

export default DynamicForm
