import { useState, useEffect } from 'react'
import axios from 'axios'

const useThreadInfo = (cfskey, cfstoken) => {
  const [threadData, setThreadData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchThreadInfo = async () => {
      const baseUrl = process.env.REACT_APP_BASE_URL
      const cfskey = process.env.REACT_APP_CFSKEY
      const cfstoken = process.env.REACT_APP_CFSTOKEN

      if (!cfskey || !cfstoken) {
        console.error("Las variables de entorno no están configuradas correctamente.")
        setError("Las variables de entorno no están configuradas correctamente.")
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(
          `${baseUrl}/${cfskey}/${cfstoken}`
        )
        setThreadData(response.data)
        setLoading(false)
        console.log("Datos de la API:", response.data)
      } catch (err) {
        console.error('Error al obtener los datos:', err)
        setError(err.message)
        setLoading(false)
      }
    };
    fetchThreadInfo()
  }, [])

  return { threadData, loading, error }
}

export default useThreadInfo
