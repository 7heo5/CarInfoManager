import { useEffect, useState } from "react";

function CarList() {
    const [cars, setCars] = useState([]);

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
                </tr>
              ))}
                </tbody>
          </table>
        </div>
    );
}

export default CarList;