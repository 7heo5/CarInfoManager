import { useEffect, useState } from "react";

function CarList({ cars, onDelete, onEdit }) {
  const [setCars] = useState([]);

  // This runs once when the component mounts
  useEffect(() => {
    fetch("http://localhost:5257/api/cars") // Update port if needed
      .then((res) => res.json())
      .then((data) => {
        setCars(data); // Store the result in our state
      })
      .catch((err) => {
        console.error("Failed to fetch cars:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Car List</h2>
      <table className="table-auto border-collapse w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Make</th>
            <th className="border px-4 py-2">Model</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">VIN</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td className="border px-4 py-2">{car.make}</td>
              <td className="border px-4 py-2">{car.model}</td>
              <td className="border px-4 py-2">{car.year}</td>
              <td className="border px-4 py-2">{car.vin}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => onEdit(car)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(car.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarList;