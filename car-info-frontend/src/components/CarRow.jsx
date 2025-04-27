function CarRow({ car, onEdit, onDelete, toggleServiceHistory, expanded }) {
    return (
      <tr>
        <td className="border px-4 py-2">{car.make}</td>
        <td className="border px-4 py-2">{car.model}</td>
        <td className="border px-4 py-2">{car.year}</td>
        <td className="border px-4 py-2">{car.vin}</td>
        <td className="border px-4 py-2 space-x-2">
          <button onClick={() => onEdit(car)} className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
          <button onClick={() => onDelete(car.id)} className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded">Delete</button>
          <button onClick={() => toggleServiceHistory(car.id)} className="px-2 py-1 bg-blue-500 text-white rounded">
            {expanded ? "Hide" : "View"} Service History
          </button>
        </td>
      </tr>
    );
  }
  
  export default CarRow;
  