import { useState, useEffect } from 'react';
import axios from 'axios';

const useThreadInfo = () => {
  const [threadData, setThreadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreadInfo = async () => {
      const cfskey = process.env.REACT_APP_CFSKEY;
      const cfstoken = process.env.REACT_APP_CFSTOKEN;

      if (!cfskey || !cfstoken) {
        console.error("Las variables de entorno no están configuradas correctamente.");
        setError("Las variables de entorno no están configuradas correctamente.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api-sandbox.confirmsign.com/v4.0/threads/token/${cfskey}/${cfstoken}`
        );
        setThreadData(response.data);
        setLoading(false);
        console.log("Datos de la API:", response.data); // Verificar si los datos están llegando
      } catch (err) {
        console.error('Error al obtener los datos:', err);
        setError(err.message);
        setLoading(false);
      }
    };
    fetchThreadInfo();
  }, []);

  return { threadData, loading, error };
};

export default useThreadInfo;
