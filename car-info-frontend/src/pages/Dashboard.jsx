import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import ServiceHistory from "../components/ServiceHistory";

function Dashboard() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [expandedCarId, setExpandedCarId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5257/api/cars')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load cars.");
        return res.json();
      })
      .then((data) => setCars(data))
      .catch((err) => {
        console.error("Error loading cars:", err);
        setError("Failed to load cars.");
      });
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

  const toggleServiceHistory = (carId) => {
    setExpandedCarId(expandedCarId === carId ? null : carId);
  };

  return (
    <div>
      {/* "+ Add New Car" text button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/add")}
          className="text-blue-400 hover:underline font-medium"
        >
          + Add New Car
        </button>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Car Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car.id}>
            <CarCard
              car={car}
              onEdit={() => navigate(`/edit/${car.id}`)}
              onDelete={handleDelete}
              onViewServiceHistory={toggleServiceHistory}
              expanded={expandedCarId === car.id}
            />
            {expandedCarId === car.id && (
              <ServiceHistory carId={car.id} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
