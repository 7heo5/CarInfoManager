function ServiceRecordItem({ record, editingRecordId, setEditingRecordId, editForm, setEditForm, setServiceRecords }) {
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updated = {
      ...editForm,
      cost: parseFloat(editForm.cost),
      date: new Date(editForm.date).toISOString(),
    };

    const res = await fetch(`http://localhost:5257/api/servicerecords/${editingRecordId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      const result = await res.json();
      setServiceRecords((prev) => prev.map((r) => (r.id === result.id ? result : r)));
      setEditingRecordId(null);
    } else {
      alert("Failed to update service record.");
    }
  };

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5257/api/servicerecords/${record.id}`, { method: "DELETE" });
    if (res.ok) {
      setServiceRecords((prev) => prev.filter((r) => r.id !== record.id));
    } else {
      alert("Failed to delete record.");
    }
  };

  if (editingRecordId === record.id) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg space-y-2">
        <form onSubmit={handleEditSubmit} className="space-y-2">
          <input type="date" name="date" value={editForm.date} onChange={handleEditChange}
            className="w-full bg-gray-700 text-white rounded p-2" required />
          <input type="text" name="serviceType" value={editForm.serviceType} onChange={handleEditChange}
            className="w-full bg-gray-700 text-white rounded p-2" required />
          <input type="number" name="cost" value={editForm.cost} onChange={handleEditChange}
            className="w-full bg-gray-700 text-white rounded p-2" required />
          <input type="text" name="notes" value={editForm.notes} onChange={handleEditChange}
            className="w-full bg-gray-700 text-white rounded p-2" />
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
            <button type="button" onClick={() => setEditingRecordId(null)} className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">{new Date(record.date).toLocaleDateString()} — {record.serviceType}</p>
          <p className="text-sm text-gray-400">£{record.cost} | {record.notes}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => {
            setEditingRecordId(record.id);
            setEditForm({
              id: record.id,
              carId: record.carId,
              date: record.date.split('T')[0],
              serviceType: record.serviceType,
              cost: record.cost,
              notes: record.notes,
            });
          }} className="text-blue-400 hover:text-blue-300">Edit</button>
          <button onClick={handleDelete} className="text-red-400 hover:text-red-300">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default ServiceRecordItem;
