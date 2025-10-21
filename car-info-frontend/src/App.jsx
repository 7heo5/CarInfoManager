import './App.css'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddCar from './pages/AddCar';
import EditCar from './pages/EditCar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<AddCar />} />
              <Route path="/edit/:id" element={<EditCar />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
