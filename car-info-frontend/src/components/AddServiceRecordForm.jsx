function AddServiceRecordForm({ newRecord, onChange, onSubmit }) {
    return (
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="mt-4 bg-white p-3 border rounded space-y-2">
        <div>
          <label className="block text-sm font-medium">Date</label>
          <input type="date" name="date" value={newRecord.date} onChange={onChange} className="border rounded p-1 w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Service Type</label>
          <input type="text" name="serviceType" value={newRecord.serviceType} onChange={onChange} className="border rounded p-1 w-full" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Notes</label>
          <textarea name="notes" value={newRecord.notes} onChange={onChange} className="border rounded p-1 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium">Cost (£)</label>
          <input type="number" name="cost" value={newRecord.cost} onChange={onChange} className="border rounded p-1 w-full" step="0.01" required />
        </div>
        <button type="submit" className="mt-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Add Service Record</button>
      </form>
    );
  }
  
  export default AddServiceRecordForm;
  