import React from 'react';

const Question = ({ question }) => {
  switch (question.type) {
    case 'CHECK':
      return (
        <div>
          <label>{question.label}</label>
          {question.options.map((option) => (
            <div key={option.oid}>
              <input
                type="checkbox"
                id={`option-${option.oid}`}
                defaultChecked={option.default}
              />
              <label htmlFor={`option-${option.oid}`}>{option.label}</label>
            </div>
          ))}
        </div>
      );

    case 'TEXT':
      const textOption = question.options[0];  // Se asume que hay una opción para el input de texto
      return (
        <div>
          <label>{question.label}</label>
          <input
            type="text"
            placeholder={textOption.label}
            minLength={textOption.input.min}
            maxLength={textOption.input.max}
          />
        </div>
      );

    default:
      return <p>Tipo de pregunta no soportado.</p>;
  }
};

export default Question;
