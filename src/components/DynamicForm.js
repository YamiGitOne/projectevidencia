import React from 'react';
import useThreadInfo from '../hooks/useThreadInfo';  // Importamos el hook
import Question from './Question';  // Importamos el componente para mostrar las preguntas

const DynamicForm = () => {
  const { threadData, loading, error } = useThreadInfo();  // Usamos el hook para obtener los datos

  if (loading) return <p>Cargando datos...</p>;  // Mostrar mensaje de carga
  if (error) return <p>Error: {error}</p>;  // Mostrar error si ocurre

  const form = threadData?.agreement?.forms?.[0];  // Accedemos al primer formulario disponible

  if (!form) return <p>No hay formulario disponible</p>;  // En caso de que no haya formulario

  return (
    <div>
      <h2>{form.title}</h2>  {/* Mostramos el título del formulario */}

      {/* Iteramos sobre las preguntas y las mostramos utilizando el componente Question */}
      {form.questions.map((question) => (
        <div key={question.qid}>
          <Question question={question} />
        </div>
      ))}
    </div>
  );
};

export default DynamicForm;
