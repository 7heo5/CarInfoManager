import ServiceRecordItem from "./ServiceRecordItem";
import AddServiceRecordForm from "./AddServiceRecordForm";

function ServiceHistory({
  carId, serviceRecords, setServiceRecords,
  newRecord, setNewRecord,
  editingRecordId, setEditingRecordId,
  editForm, setEditForm,
  refreshServiceHistory
}) {
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
      refreshServiceHistory();
      setNewRecord({ date: '', serviceType: '', notes: '', cost: '' });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bg-gray-700 rounded-xl p-4 mt-4 text-white">
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
