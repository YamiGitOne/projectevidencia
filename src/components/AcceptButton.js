import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcceptButton = () => {
  const [threadData, setThreadData] = useState({
    details: {
      id: 1,
      optionChecked: false,
    },
    content: 'Contenido inicial',
    closed: false, // Para saber si el hilo ya está aceptado
    agreement: {
      accept_button_text: 'Aceptar' // El texto del botón, ejemplo
    }
  });
  const [accepting, setAccepting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [accepted, setAccepted] = useState(threadData.closed); // Estado para saber si está aceptado

  // Al actualizar los datos del hilo, cambiar el estado "accepted"
  useEffect(() => {
    setAccepted(threadData.closed);
  }, [threadData]);

  const validateThreadData = (data) => {
    if (typeof data.details !== 'object') {
      console.error('El formato de threadData es incorrecto: "details" debe ser un objeto.');
      return false;
    }

    if (typeof data.content !== 'string') {
      console.error('El formato de threadData es incorrecto: "content" debe ser una cadena.');
      return false;
    }

    if (!data.details.hasOwnProperty('id') || typeof data.details.id !== 'number') {
      console.error('El formato de threadData es incorrecto: "details.id" debe ser un número y debe existir.');
      return false;
    }

    return true;
  }

  const handleAccept = async () => {
    setAccepting(true);

    if (!validateThreadData(threadData)) {
      console.error('El formato de threadData es incorrecto.');
      setPostError('El formato de los datos es incorrecto.');
      setAccepting(false);
      return;
    }

    const postData = {
      form: {
        details: {
          id: threadData.details.id,
          optionChecked: threadData.details.optionChecked,
        },
        content: threadData.content,
      },
    }
   

    try {
      const baseUrl = process.env.REACT_APP_BASE_URL;
      const cfskey = process.env.REACT_APP_CFSKEY;
      const cfstoken = process.env.REACT_APP_CFSTOKEN;

      if (!baseUrl || !cfskey || !cfstoken) {
        throw new Error('Faltan configuraciones en las variables de entorno');
      }

      const postUrl = `${baseUrl}/${cfskey}/${cfstoken}/agreement/true`;

      const response = await axios.post(postUrl, postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Respuesta del POST:', response.data);

      // Si la respuesta es exitosa y el hilo se cierra, actualizamos el estado
      if (response.data.closed) {
        setAccepted(true);
        setThreadData(prevData => ({
          ...prevData,
          closed: true,
        }));
      }

      setAccepting(false);
    } catch (err) {
      console.error('Error al aceptar el hilo:', err.response || err.message);
      setPostError(`Error: ${err.response?.data?.message || err.message}`);
      setAccepting(false);
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      {postError && <p style={{ color: 'red' }}>Error: {postError}</p>}

      {!accepted ? (
        <button
          onClick={handleAccept}
          disabled={accepting}
          style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {accepting ? 'Aceptando...' : threadData.agreement.accept_button_text || 'Aceptar'}
        </button>
      ) : (
        <p>El hilo ha sido aceptado.</p> // Mostrar mensaje cuando el hilo ya esté aceptado
      )}
    </div>
  );
}

export default AcceptButton;
