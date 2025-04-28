import React, { useState } from "react";
import CarRow from "./CarRow";
import ServiceHistory from "./ServiceHistory";
import CarCard from "./CarCard";

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
      <h2 className="text-3xl font-bold mb-8 text-black">My Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div key={car.id}>
            <CarCard
              car={car}
              onViewServiceHistory={toggleServiceHistory}
              onDelete={onDelete}
              onEdit={onEdit}
              expanded={expandedCarId === car.id}
            />
            {expandedCarId === car.id && (
              <div className="mt-4">
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
                    setTimeout(() => toggleServiceHistory(car.id), 100);
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;
