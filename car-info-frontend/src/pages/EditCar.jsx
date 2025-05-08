import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditCar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [vin, setVin] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5257/api/cars/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setMake(data.make);
                setModel(data.model);
                setYear(data.year);
                setVin(data.vin);
            })
            .catch((err) => setError("Failed to load car."));
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedCar = {
            id: parseInt(id),
            make,
            model,
            year: parseInt(year),
            vin
        };

        try {
            const res = await fetch(`http://localhost:5257/api/cars/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCar),
            });

            if (!res.ok) throw new Error("Failed to update car.");
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    if (!make && !model && !year && !vin && !error) return <p>Loading...</p>;

    return (
        <div className="p-6 border rounded-2xl mb-6 bg-gray-100 dark:bg-gray-800 shadow-md">
            <h1 className="text-3xl font-bold mb-4">Edit Car</h1>
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
                    Update Car
                </button>
            </form>
        </div>
    );
}

export default EditCar;
