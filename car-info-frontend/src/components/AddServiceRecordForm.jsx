import React from "react";

function AddServiceRecordForm({ newRecord, onChange, onSubmit }) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="mt-4 bg-gray-800 p-4 rounded-lg space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Date</label>
        <input
          type="date"
          name="date"
          value={newRecord.date}
          onChange={onChange}
          className="w-full bg-gray-700 text-white rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Service Type</label>
        <input
          type="text"
          name="serviceType"
          value={newRecord.serviceType}
          onChange={onChange}
          className="w-full bg-gray-700 text-white rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Notes</label>
        <textarea
          name="notes"
          value={newRecord.notes}
          onChange={onChange}
          className="w-full bg-gray-700 text-white rounded p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Cost (£)</label>
        <input
          type="number"
          name="cost"
          value={newRecord.cost}
          onChange={onChange}
          className="w-full bg-gray-700 text-white rounded p-2"
          step="0.01"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Add Service Record
      </button>
    </form>
  );
}

export default AddServiceRecordForm;
