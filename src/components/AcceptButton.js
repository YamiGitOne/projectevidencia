import React, { useState, useEffect } from 'react'
import axios from 'axios'

const AcceptButton = ({ threadData }) => {
  const [accepting, setAccepting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [accepted, setAccepted] = useState(threadData?.closed || false)

  useEffect(() => {
    if (threadData) {
      setAccepted(threadData.closed || false)
    }
  }, [threadData])

  const handleAccept = async () => {
    setAccepting(true)

    if (!threadData || accepted) {
      setPostError('Este hilo ya ha sido aceptado o rechazado o no existe.')
      setAccepting(false)
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

      const response = await axios.post(postUrl, { form: threadData }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('Respuesta del POST:', response.data)


      if (response.data.closed) {
        setAccepted(true)

        setPostError(null)
      }

      setAccepting(false)
    } catch (err) {
      console.error('Error al aceptar el hilo:', err.response?.data || err.message)
      setPostError(`Error: ${err.response?.data?.exception?.description || err.message}`)
      setAccepting(false)
    }
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {postError && <p style={{ color: 'red' }}>Error: {postError}</p>}

      {!accepted ? (
        <button
          onClick={handleAccept}
          disabled={accepting}
          style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {accepting ? 'Aceptando...' : threadData?.agreement?.accept_button_text || 'Aceptar'}
        </button>
      ) : (
        <p style={{ color: 'green', fontWeight: 'bold' }}>El hilo ha sido aceptado.</p> 
      )}
    </div>
  )
}

export default AcceptButton
