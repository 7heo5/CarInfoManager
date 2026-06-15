import React, { useEffect, useState } from "react";
import { apiUrl } from "@/api/client";
import type { Car } from "@/types";

const CarDetails = () => {
    const [car, setCar] = useState<Car | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCar = async () => {
            try{
                const response = await fetch(apiUrl("/api/cars"));
                if (!response.ok) {
                    throw new Error("Failed to fetch car details");
                }
                const data = await response.json() as Car;
                setCar(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch car details");
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
