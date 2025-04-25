import { useState } from "react";
import React from "react";

function CarList({ cars, onDelete, onEdit }) {
  const [expandedCarId, setExpandedCarId] = useState(null);
  const [serviceRecords, setServiceRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    date: '',
    serviceType: '',
    notes: '',
    cost: '',
  });
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

  const handleRecordChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddServiceRecord = async (carId) => {
    const recordToSend = {
      ...newRecord,
      carId,
      cost: parseFloat(newRecord.cost),
      date: new Date(newRecord.date).toISOString(),
    };

    try {
      const res = await fetch('http://localhost:5257/api/servicerecords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recordToSend),
      });

      if (!res.ok) throw new Error('Failed to add service record');

      // Refresh Records
      toggleServiceHistory(carId); // collapse
      toggleServiceHistory(carId); // re-expand and re-fetch
      setNewRecord({ date: '', serviceType: '', notes: '', cost: '' });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditClick = (record) => {
    setEditingRecordId(record.id);
    setEditForm({
      id: record.id,
      carId: record.carId,
      date: record.date.split('T')[0],
      serviceType: record.serviceType,
      cost: record.cost,
      notes: record.notes,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedRecord = {
      ...editForm,
      cost: parseFloat(editForm.cost),
      date: new Date(editForm.date).toISOString(),
    };
    const res = await fetch(`http://localhost:5257/api/servicerecords/${editingRecordId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    if (res.ok) {
      const updated = await res.json();
      setServiceRecords((prev) =>
        prev.map((r) => (r.id === updated.id ? updated : r))
      );
      setEditingRecordId(null);
    } else {
      alert("Failed to update service record.");
    }
  };

  const handleDeleteRecord = async (recordId) => {
    const res = await fetch(`http://localhost:5257/api/servicerecords/${recordId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setServiceRecords((prev) => prev.filter((r) => r.id !== recordId));
    } else {
      alert("Failed to delete record.");
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
                          <li key={record.id} className="mb-2">
                            {editingRecordId === record.id ? (
                              <form onSubmit={handleEditSubmit} className="space-y-2">
                                <input type="date" name="date" value={editForm.date} onChange={handleEditChange} className="border rounded px-2" required />
                                <input type="text" name="serviceType" value={editForm.serviceType} onChange={handleEditChange} placeholder="Type" className="border rounded px-2" required />
                                <input type="number" name="cost" value={editForm.cost} onChange={handleEditChange} placeholder="Cost" className="border rounded px-2" required />
                                <input type="text" name="notes" value={editForm.notes} onChange={handleEditChange} placeholder="Notes" className="border rounded px-2" />
                                <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
                                <button type="button" onClick={() => setEditingRecordId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
                              </form>
                            ) : (
                              <>
                                <strong>{new Date(record.date).toLocaleDateString()}</strong> - {record.serviceType} (${record.cost})<br />
                                <span className="text-sm text-gray-600">{record.notes}</span><br />
                                <button onClick={() => handleEditClick(record)} className="text-blue-500 mr-2">Edit</button>
                                <button onClick={() => handleDeleteRecord(record.id)} className="text-red-500">Delete</button>
                              </>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleAddServiceRecord(car.id);
                      }}
                      className="mt-4 bg-white p-3 border rounded space-y-2"
                    >
                      <div>
                        <label className="block text-sm font-medium">Date</label>
                        <input
                          type="date"
                          name="date"
                          value={newRecord.date}
                          onChange={handleRecordChange}
                          className="border rounded p-1 w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Service Type</label>
                        <input
                          type="text"
                          name="serviceType"
                          value={newRecord.serviceType}
                          onChange={handleRecordChange}
                          className="border rounded p-1 w-full"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Notes</label>
                        <textarea
                          name="notes"
                          value={newRecord.notes}
                          onChange={handleRecordChange}
                          className="border rounded p-1 w-full"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Cost (£)</label>
                        <input
                          type="number"
                          name="cost"
                          value={newRecord.cost}
                          onChange={handleRecordChange}
                          className="border rounded p-1 w-full"
                          step="0.01"
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Add Service Record
                      </button>
                    </form>
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