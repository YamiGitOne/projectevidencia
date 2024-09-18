import React, { useState } from 'react'
import axios from 'axios'

const AcceptButton = () => {
  const [threadData, setThreadData] = useState({
    details: {
      id: 1,
      optionChecked: false,
    },
    content: 'Contenido inicial',
  });
  const [accepting, setAccepting] = useState(false)
  const [postError, setPostError] = useState(null)

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;

    setThreadData((prevData) => ({
      ...prevData,
      details: {
        ...prevData.details,
        optionChecked: checked,
      },
    }))

    console.log('Nuevo estado de threadData:', threadData)
  }

  const validateThreadData = (data) => {
    if (typeof data.details !== 'object') {
      console.error('El formato de threadData es incorrecto: "details" debe ser un objeto.')
      return false
    }

    if (typeof data.content !== 'string') {
      console.error('El formato de threadData es incorrecto: "content" debe ser una cadena.')
      return false
    }

    if (!data.details.hasOwnProperty('id') || typeof data.details.id !== 'number') {
      console.error('El formato de threadData es incorrecto: "details.id" debe ser un número y debe existir.')
      return false
    }

    return true
  }

  const handleAccept = async () => {
    setAccepting(true)

    if (!validateThreadData(threadData)) {
      console.error('El formato de threadData es incorrecto.')
      setPostError('El formato de los datos es incorrecto.')
      setAccepting(false);
      return
    }


    try {
      const baseUrl = process.env.REACT_APP_BASE_URL
      const cfskey = process.env.REACT_APP_CFSKEY
      const cfstoken = process.env.REACT_APP_CFSTOKEN

      if (!baseUrl || !cfskey || !cfstoken) {
        throw new Error('Faltan configuraciones en las variables de entorno')
      }

      const postUrl = `${baseUrl}/${cfskey}/${cfstoken}/agreement/true`

      const response = await axios.post(postUrl, threadData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setAccepting(false)
    } catch (err) {
      console.error('Error al aceptar el hilo:', err.response || err.message)
      setPostError(`Error: ${err.response?.data?.message || err.message}`)
      setAccepting(false)
    }
  }
  return (
    <div style={{ marginTop: '20px' }}>
      <label>
        <input
          type="checkbox"
          checked={threadData.details.optionChecked} 
          onChange={handleCheckboxChange} 
        />
        Aceptar opción
      </label>

      {postError && <p style={{ color: 'red' }}>Error: {postError}</p>}
      <button
        onClick={handleAccept}
        disabled={accepting}
        style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        {accepting ? 'Aceptando...' : 'Aceptar'}
      </button>
    </div>
  )
}

export default AcceptButton
