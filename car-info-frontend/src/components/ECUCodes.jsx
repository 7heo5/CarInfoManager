// src/components/ECUCodes.jsx
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5257";

export default function ECUCodes({ carId }) {
    const [codes, setCodes] = useState([]);
    const [newCode, setNewCode] = useState({ code: "", description: "" });
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!carId) return;

        axios
            .get(`/api/ECUCodes/${carId}`)
            .then((res) => {
                // Ensure we always store an array
                const data = Array.isArray(res.data) ? res.data : [];
                setCodes(data);
            })
            .catch((err) => {
                console.error("Failed to fetch ECU codes:", err);
                setCodes([]); // prevent render crash
            });
    }, [carId]);


    const addCode = async () => {
        try {
            const res = await axios.post("/api/ECUCodes", {
                carId,
                code: newCode.code,
                description: newCode.description,
                status: "Pending",
            });
            setCodes([...codes, res.data]);
            setNewCode({ code: "", description: "" });
            setShowForm(false);
        } catch (err) {
            console.error("Error adding ECU code:", err);
        }
    };

    return (
        <div className="mt-6 bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white">ECU Error Codes</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                    {showForm ? "Cancel" : "Add Code"}
                </button>
            </div>

            {showForm && (
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                        className="p-2 rounded bg-gray-700 text-white w-full"
                        placeholder="Code (e.g. P0301)"
                        value={newCode.code}
                        onChange={(e) => setNewCode({ ...newCode, code: e.target.value })}
                    />
                    <input
                        className="p-2 rounded bg-gray-700 text-white w-full"
                        placeholder="Description"
                        value={newCode.description}
                        onChange={(e) =>
                            setNewCode({ ...newCode, description: e.target.value })
                        }
                    />
                    <div className="col-span-2 flex gap-2 justify-end">
                        <button
                            onClick={() => setShowForm(false)}
                            className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={addCode}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

            {Array.isArray(codes) && codes.length > 0 ? (
                <ul className="divide-y divide-gray-700">
                    {codes.map((c) => (
                        <li key={c.id} className="py-2 flex justify-between items-center">
                            <div>
                                <span className="font-semibold text-white">{c.code}</span>
                                <span className="text-gray-300 ml-2">{c.description}</span>
                            </div>
                            <span
                                className={`text-sm px-2 py-1 rounded ${c.status === "Resolved"
                                    ? "bg-green-700 text-green-200"
                                    : "bg-yellow-700 text-yellow-200"
                                    }`}
                            >
                                {c.status}
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 italic">No ECU codes logged.</p>
            )}
        </div>
    );
}
