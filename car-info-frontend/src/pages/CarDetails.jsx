import React, { useEffect, useState } from "react";

const CarDetails = () => {
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCar = async () => {
            try{
                const response = await fetch("http://localhost:5257/api/cars");
                if (!response.ok) {
                    throw new Error("Failed to fetch car details");
                }
                const data = await response.json();
                setCar(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, []);

    if (loading) return <p className="text-center mt-8">Loading car details...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
    if (!car) return <p className="text-center mt-8">No car data avaliable.</p>;

    return (
        <div className="bg-white shadow-md rounded-xl p-6 max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Car Details</h2>
            <ul className="text-gray-700 space-y-2">
                <li><strong>Make:</strong> {car.make}</li>
                <li><strong>Model:</strong> {car.model}</li>
                <li><strong>Year:</strong> {car.year}</li>
                <li><strong>VIN:</strong> {car.vin}</li>
            </ul>
        </div>
    );
};

export default CarDetails;