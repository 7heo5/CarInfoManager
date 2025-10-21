// src/components/ECUCodes.jsx
import { useState, useEffect } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5257";

export default function ECUCodes({ carId }) {
    const [codes, setCodes] = useState([]);
    const [newCode, setNewCode] = useState({ code: "", description: "" });
    const [showForm, setShowForm] = useState(false);
    const [editingCode, setEditingCode] = useState(null);
    const [editForm, setEditForm] = useState({ code: "", description: "", status: "Pending" });

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

    const startEdit = (code) => {
        setEditingCode(code.id);
        setEditForm({
            code: code.code,
            description: code.description,
            status: code.status
        });
    };

    const cancelEdit = () => {
        setEditingCode(null);
        setEditForm({ code: "", description: "", status: "Pending" });
    };

    const updateCode = async () => {
        try {
            await axios.put(`/api/ECUCodes/${editingCode}`, {
                code: editForm.code,
                description: editForm.description,
                status: editForm.status,
            });
            
            setCodes(codes.map(c => 
                c.id === editingCode 
                    ? { ...c, code: editForm.code, description: editForm.description, status: editForm.status }
                    : c
            ));
            cancelEdit();
        } catch (err) {
            console.error("Error updating ECU code:", err);
        }
    };

    const deleteCode = async (id) => {
        if (!window.confirm("Are you sure you want to delete this ECU code?")) {
            return;
        }
        
        try {
            await axios.delete(`/api/ECUCodes/${id}`);
            setCodes(codes.filter(c => c.id !== id));
        } catch (err) {
            console.error("Error deleting ECU code:", err);
        }
    };

    const toggleStatus = async (code) => {
        const newStatus = code.status === "Pending" ? "Resolved" : "Pending";
        try {
            await axios.put(`/api/ECUCodes/${code.id}`, {
                code: code.code,
                description: code.description,
                status: newStatus,
            });
            
            setCodes(codes.map(c => 
                c.id === code.id 
                    ? { ...c, status: newStatus }
                    : c
            ));
        } catch (err) {
            console.error("Error updating ECU code status:", err);
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
                        <li key={c.id} className="py-3">
                            {editingCode === c.id ? (
                                // Edit form
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <input
                                        className="p-2 rounded bg-gray-700 text-white w-full"
                                        placeholder="Code (e.g. P0301)"
                                        value={editForm.code}
                                        onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                                    />
                                    <input
                                        className="p-2 rounded bg-gray-700 text-white w-full"
                                        placeholder="Description"
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                    />
                                    <select
                                        className="p-2 rounded bg-gray-700 text-white w-full"
                                        value={editForm.status}
                                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                    <div className="col-span-2 flex gap-2 justify-end">
                                        <button
                                            onClick={cancelEdit}
                                            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={updateCode}
                                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                // Display mode
                                <div className="flex justify-between items-center">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-white">{c.code}</span>
                                            <span className="text-gray-300">{c.description}</span>
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            Logged: {new Date(c.loggedDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => toggleStatus(c)}
                                            className={`text-sm px-2 py-1 rounded cursor-pointer hover:opacity-80 ${
                                                c.status === "Resolved"
                                                    ? "bg-green-700 text-green-200"
                                                    : "bg-yellow-700 text-yellow-200"
                                            }`}
                                            title={`Click to change to ${c.status === "Pending" ? "Resolved" : "Pending"}`}
                                        >
                                            {c.status}
                                        </button>
                                        <button
                                            onClick={() => startEdit(c)}
                                            className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                                            title="Edit ECU code"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => deleteCode(c.id)}
                                            className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                                            title="Delete ECU code"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-400 italic">No ECU codes logged.</p>
            )}
        </div>
    );
}
