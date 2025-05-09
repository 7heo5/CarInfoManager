import { useState, useEffect } from "react";
import ServiceRecordItem from "./ServiceRecordItem";
import AddServiceRecordForm from "./AddServiceRecordForm";

function ServiceHistory({ carId }) {
  const [serviceRecords, setServiceRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    date: "",
    serviceType: "",
    notes: "",
    cost: "",
  });
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchServiceRecords = async () => {
    try {
      const res = await fetch(`http://localhost:5257/api/servicerecords/car/${carId}`);
      if (!res.ok) throw new Error("Failed to fetch service records");
      const data = await res.json();
      setServiceRecords(data);
    } catch (error) {
      console.error("Error loading service records:", error);
    }
  };

  useEffect(() => {
    fetchServiceRecords();
  }, [carId]);

  const handleRecordChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddServiceRecord = async () => {
    const recordToSend = {
      ...newRecord,
      carId,
      cost: parseFloat(newRecord.cost),
      date: new Date(newRecord.date).toISOString(),
    };

    try {
      const res = await fetch('http://localhost:5257/api/servicerecords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordToSend),
      });

      if (!res.ok) throw new Error('Failed to add service record');
      fetchServiceRecords();
      setNewRecord({ date: '', serviceType: '', notes: '', cost: '' });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-4 mt-4 text-white">
      <h4 className="text-lg font-bold mb-3">Service History</h4>

      {serviceRecords.length === 0 ? (
        <p className="italic text-gray-300">No service history yet.</p>
      ) : (
        <div className="space-y-3">
          {serviceRecords.map((record) => (
            <ServiceRecordItem
              key={record.id}
              record={record}
              editingRecordId={editingRecordId}
              setEditingRecordId={setEditingRecordId}
              editForm={editForm}
              setEditForm={setEditForm}
              setServiceRecords={setServiceRecords}
              refreshServiceHistory={fetchServiceRecords}
            />
          ))}
        </div>
      )}

      <div className="mt-6">
        <h5 className="text-md font-semibold mb-2">Add New Record</h5>
        <AddServiceRecordForm
          newRecord={newRecord}
          onChange={handleRecordChange}
          onSubmit={() => handleAddServiceRecord(carId)}
        />
      </div>
    </div>
  );
}

export default ServiceHistory;
