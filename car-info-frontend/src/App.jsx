import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3x1 font-bold text-blue-600 mb-4">Car Info Manager</h1>
        <p className="text-gray-700">Your central hub for car maintenance, service history, and diagnostics.</p>
      </div>
  );
}

export default App
