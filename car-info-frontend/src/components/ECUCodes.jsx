// src/components/ECUCodes.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-component";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, CheckCircle, Clock, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
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
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold">ECU Error Codes</CardTitle>
                <Button
                    onClick={() => setShowForm(!showForm)}
                    variant="outline"
                    size="sm"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    {showForm ? "Cancel" : "Add Code"}
                </Button>
            </CardHeader>

            <CardContent className="space-y-4">
                {showForm && (
                    <div className="mb-6 space-y-4 p-4 border rounded-lg bg-muted/50">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                placeholder="Code (e.g. P0301)"
                                value={newCode.code}
                                onChange={(e) => setNewCode({ ...newCode, code: e.target.value })}
                            />
                            <Input
                                placeholder="Description"
                                value={newCode.description}
                                onChange={(e) =>
                                    setNewCode({ ...newCode, description: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex gap-2 justify-end">
                            <Button
                                onClick={() => setShowForm(false)}
                                variant="outline"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={addCode}
                                className="bg-green-600 hover:bg-green-700"
                            >
                                Save Code
                            </Button>
                        </div>
                    </div>
                )}

                {Array.isArray(codes) && codes.length > 0 ? (
                    <div className="space-y-4">
                        {codes.map((c) => (
                            <Card key={c.id} className="min-h-[120px]">
                                <CardContent className="pt-6">
                                    {editingCode === c.id ? (
                                        // Edit form
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <Input
                                                    placeholder="Code (e.g. P0301)"
                                                    value={editForm.code}
                                                    onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                                                />
                                                <Input
                                                    placeholder="Description"
                                                    value={editForm.description}
                                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex gap-2 justify-end">
                                                <Button
                                                    onClick={cancelEdit}
                                                    variant="outline"
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={updateCode}
                                                    className="bg-green-600 hover:bg-green-700"
                                                >
                                                    Save Changes
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Display mode
                                        <div className="flex justify-between items-start min-h-[80px]">
                                            <div className="flex-1 pr-4">
                                                <div className="flex items-center gap-2 mb-3">
                                                    <span className="font-semibold text-lg">{c.code}</span>
                                                    <Badge 
                                                        variant={c.status === "Resolved" ? "default" : "secondary"}
                                                        className={cn(
                                                            "cursor-pointer hover:opacity-80",
                                                            c.status === "Resolved" 
                                                                ? "bg-green-600 hover:bg-green-700" 
                                                                : "bg-yellow-600 hover:bg-yellow-700"
                                                        )}
                                                        onClick={() => toggleStatus(c)}
                                                    >
                                                        {c.status === "Resolved" ? (
                                                            <CheckCircle className="h-3 w-3 mr-1" />
                                                        ) : (
                                                            <Clock className="h-3 w-3 mr-1" />
                                                        )}
                                                        {c.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-muted-foreground mb-2 break-words">{c.description}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Logged: {new Date(c.loggedDate).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <Button
                                                    onClick={() => startEdit(c)}
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => deleteCode(c.id)}
                                                    variant="destructive"
                                                    size="sm"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Wrench className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">No ECU codes logged</p>
                        <p className="text-sm">Add your first error code to get started</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
