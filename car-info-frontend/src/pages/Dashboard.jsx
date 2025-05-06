import { useEffect, useState } from 'react';
import CarList from '../components/CarList';

function Dashboard() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5257/api/cars')
      .then((res) => res.json())
      .then((data) => setCars(data));
  }, []);

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

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      <CarList cars={cars} onDelete={handleDelete} />
    </div>
  );
}

export default Dashboard;
