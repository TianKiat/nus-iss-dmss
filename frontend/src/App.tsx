import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Nav></Nav>
    </>
  )
}

export default App
