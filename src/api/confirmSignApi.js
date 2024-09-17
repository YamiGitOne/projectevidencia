import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://api-sandbox.confirmsign.com/v4.0',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getThreadInfo = (cskey, cfstoken) => {
  return apiClient.get(`/threads/token/${cskey}/${cfstoken}`)
}
