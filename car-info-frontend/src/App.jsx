import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CarDetails from './CarDetails';
import CarList from './components/CarList';
import AddCarForm from './components/AddCarForm';

function App() {
  //const [count, setCount] = useState(0)
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);

  // Load cars on mount
  useEffect(() => {
    fetch('http://localhost:5257/api/cars')
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((err) => console.error("Error loading cars:", err));
  }, []);

  const handleCarAdded = (newCar) => {
    setCars((prevCars) => [...prevCars, newCar]);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5257/api/cars/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setCars((prev) => prev.filter((c) => c.id !== id));
    } else {
      alert('Failed to delete car.');
    }
  };

  const handleEdit = (car) => {
    const newMake = prompt('New Make:', car.make);
    const newModel = prompt('New Model:', car.model);
    const newYear = prompt('New Year:', car.year);
    const newVin = prompt('New VIN:', car.vin);

    if (!newMake || !newModel || !newYear || !newVin) {
      return alert('All fields are required.');
    }

    const updatedCar = {
      ...car,
      make: newMake,
      model: newModel,
      year: parseInt(newYear),
      vin: newVin,
    };

    fetch(`http://localhost:5257/api/cars/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCar),
    })
      .then((res) => {
        if (res.ok) {
          setCars((prev) =>
            prev.map((c) => (c.id === car.id ? updatedCar : c))
          );
        } else {
          alert('Failed to update car.');
        }
      });
  };

  return (
      <div className="min-h-screen bg-gray-900 p-4">
        <h1 className="text-5xl font-bold text-white mb-8">Car Service Manager</h1>
        <AddCarForm onCarAdded={handleCarAdded}/>
        <CarList cars={cars} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
  );
}

export default App;
