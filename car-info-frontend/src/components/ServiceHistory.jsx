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
    <tr>
      <td colSpan="5" className="bg-gray-100 p-4">
        <h4 className="font-semibold mb-2">Service Records</h4>
        {serviceRecords.length === 0 ? (
          <p className="italic">No service history.</p>
        ) : (
          <ul className="list-disc list-inside space-y-1">
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
          </ul>
        )}
        <AddServiceRecordForm
          newRecord={newRecord}
          onChange={handleRecordChange}
          onSubmit={() => handleAddServiceRecord(carId)}
        />
      </td>
    </tr>
  );
}

export default ServiceHistory;
