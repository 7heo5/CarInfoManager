import { useState } from "react";
import React from "react";

function CarList({ cars, onDelete, onEdit }) {
  const [expandedCarId, setExpandedCarId] = useState(null);
  const [serviceRecords, setServiceRecords] = useState([]);

  const toggleServiceHistory = async (carId) => {
    if (expandedCarId === carId) {
      setExpandedCarId(null);
      setServiceRecords([]);
    } else {
      try {
        const res = await fetch(`http://localhost:5257/api/servicerecords/car/${carId}`);
        if (!res.ok) throw new Error("Failed to load service history");
        const data = await res.json();
        setServiceRecords(data);
        setExpandedCarId(carId);
      } catch (error) {
        alert(error.message);
      }
    }
  };

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
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <React.Fragment key={car.id}>
              <tr>
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
                  <button
                    onClick={() => toggleServiceHistory(car.id)}
                    className="px-2 py-1 bg-blue-500 text-white rounded"
                  >
                    {expandedCarId === car.id ? "Hide" : "View"} Service History
                  </button>
                </td>
              </tr>

              {expandedCarId === car.id && (
                <tr>
                  <td colSpan="5" className="bg-gray-100 p-4">
                    <h4 className="font-semibold mb-2">Service Records</h4>
                    {serviceRecords.length === 0 ? (
                      <p className="italic">No service history.</p>
                    ) : (
                      <ul className="list-disc list-inside space-y-1">
                        {serviceRecords.map((record) => (
                          <li key={record.id}>
                            <strong>{new Date(record.date).toLocaleDateString()}</strong> – {record.serviceType} (${record.cost})<br />
                            <span className="text-sm text-gray-600">{record.notes}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarList;
