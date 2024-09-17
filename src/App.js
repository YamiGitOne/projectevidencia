import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ThreadHeader from './components/ThreadHeader'
import DynamicForm from './components/DynamicForm'
import ThreadInfo from './components/ThreadInfo'
import AcceptButton from './components/AcceptButton'

function App() {

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <ThreadHeader />
              <ThreadInfo />
              <DynamicForm />
              <AcceptButton/>
              </div>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
