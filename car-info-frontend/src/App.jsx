import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CarDetails from './CarDetails';
import CarList from './components/CarList';

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-3x1 font-bold text-blue-600 mb-4">Car Info Manager</h1>
        <CarList />
      </div>
  );
}

export default App
