import { useState } from 'react'
import './App.css'
import Pupuseria from './components/Pupuseria'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Pupuseria/>
      </div>
    </>
  )
}

export default App
