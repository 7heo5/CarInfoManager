import { useState } from "react";

function AddCarForm({ onCarAdded }) {
    // Track form field values
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        //Create car object
        const newCar = { make, model, year: parseInt(year), vin };

        try {
            const res = await fetch('http://localhost:5257/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCar),
            });

            if (!res.ok) {
                throw new Error('Failed to add car');
            }

            const createdCar = await res.json();
            onCarAdded(createdCar); // Notify parent to update list

            // Clear the form
            setMake('');
            setModel('');
            setYear('');
            setVin('');
            setError('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="p-6 border rounded-lg mb-6 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Add New Car</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="text-red-600">{error}</div>}
                <input
                    className="block w-full border px-3 py-2 rounded"
                    type="text"
                    placeholder="Make"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    required
                />
                <input
                    className="block w-full border px-3 py-2 rounded"
                    type="text"
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                />
                <input
                    className="block w-full border px-3 py-2 rounded"
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                />
                <input
                    className="block w-full border px-3 py-2 rounded"
                    type="text"
                    placeholder="VIN"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Add Car
                </button>
            </form>
        </div>
    );
}

export default AddCarForm;