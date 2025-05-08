import './App.css'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="max-w-5xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddCar />} />
          <Route path="/edit/:id" element={<EditCar />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
