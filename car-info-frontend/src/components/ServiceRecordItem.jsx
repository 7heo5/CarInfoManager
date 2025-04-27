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
        <li className="mb-2">
          <form onSubmit={handleEditSubmit} className="space-y-2">
            <input type="date" name="date" value={editForm.date} onChange={handleEditChange} required />
            <input type="text" name="serviceType" value={editForm.serviceType} onChange={handleEditChange} required />
            <input type="number" name="cost" value={editForm.cost} onChange={handleEditChange} required />
            <input type="text" name="notes" value={editForm.notes} onChange={handleEditChange} />
            <button type="submit" className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
            <button type="button" onClick={() => setEditingRecordId(null)} className="bg-gray-400 text-white px-2 py-1 rounded">Cancel</button>
          </form>
        </li>
      );
    }
  
    return (
      <li className="mb-2">
        <strong>{new Date(record.date).toLocaleDateString()}</strong> - {record.serviceType} (£{record.cost})<br />
        <span className="text-sm text-gray-600">{record.notes}</span><br />
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
        }} className="text-blue-500 mr-2">Edit</button>
        <button onClick={handleDelete} className="text-red-500">Delete</button>
      </li>
    );
  }
  
  export default ServiceRecordItem;
  