import React, { useState } from 'react';
import useThreadInfo from '../hooks/useThreadInfo';
import axios from 'axios';

const AcceptButton = () => {
  const { threadData, loading, error, acceptThread } = useThreadInfo();  // Usamos acceptThread del hook
  const [accepting, setAccepting] = useState(false);  // Estado para manejar el proceso de aceptar
  const [postError, setPostError] = useState(null);  // Estado para manejar errores del POST

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAccept = async () => {
    setAccepting(true);  // Indicamos que se está procesando la petición
  
    console.log('Objeto enviado en el POST:', threadData);
  
    try {
      const cfskey = process.env.REACT_APP_CFSKEY;
      const cfstoken = process.env.REACT_APP_CFSTOKEN;
      const postUrl = `https://api-sandbox.confirmsign.com/v4.0/threads/token/${cfskey}/${cfstoken}/agreement/true`;
  
      // Log para ver la URL y los datos que se enviarán
      console.log('URL de la solicitud POST:', postUrl);
      console.log('Datos que se envían en el POST:', threadData);
  
      // Realizamos el POST
      const response = await axios.post(postUrl, threadData);
  
      // Log para ver la respuesta del POST
      console.log('Respuesta del POST:', response.data);
  
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
      <button
        onClick={handleAccept}
        disabled={accepting}
        style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {accepting ? 'Aceptando...' : threadData.agreement?.accept_button_text || 'Aceptar'}
      </button>
    </div>
  );
};

export default AcceptButton;
