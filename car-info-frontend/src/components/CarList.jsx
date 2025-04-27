import React, { useState } from "react";
import CarRow from "./CarRow";
import ServiceHistory from "./ServiceHistory";

function CarList({ cars, onDelete, onEdit }) {
  const [expandedCarId, setExpandedCarId] = useState(null);
  const [serviceRecords, setServiceRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ date: "", serviceType: "", notes: "", cost: "" });
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editForm, setEditForm] = useState({ date: "", serviceType: "", cost: "", notes: "" });

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
              <CarRow
                car={car}
                onDelete={onDelete}
                onEdit={onEdit}
                toggleServiceHistory={toggleServiceHistory}
                expanded={expandedCarId === car.id}
              />
              {expandedCarId === car.id && (
                <ServiceHistory
                  carId={car.id}
                  serviceRecords={serviceRecords}
                  setServiceRecords={setServiceRecords}
                  newRecord={newRecord}
                  setNewRecord={setNewRecord}
                  editingRecordId={editingRecordId}
                  setEditingRecordId={setEditingRecordId}
                  editForm={editForm}
                  setEditForm={setEditForm}
                  refreshServiceHistory={() => {
                    toggleServiceHistory(car.id);
                    setTimeout(() => toggleServiceHistory(car.id), 100); // ensures refresh
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarList;
