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
        <div className="p-6 border rounded-2xl mb-6 bg-gray-100 dark:bg-gray-800 shadow-md">
            <h2 className="text-2xl font-semibold text-white mb-4 text-center">Add New Car</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {error && <div className="text-red-600">{error}</div>}
                <input
                    className="block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    type="text"
                    placeholder="Make"
                    value={make}
                    onChange={(e) => setMake(e.target.value)}
                    required
                />
                <input
                    className="block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    type="text"
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                />
                <input
                    className="block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    type="number"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                />
                <input
                    className="block w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                    type="text"
                    placeholder="VIN"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Add Car
                </button>
            </form>
        </div>
    );
}

export default AddCarForm;