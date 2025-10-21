import { useState } from "react";
import { Button } from "@/components/ui/button-component";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";

function AddCarForm({ onCarAdded }) {
    // Track form field values
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <Card className="border-destructive">
                    <CardContent className="pt-6">
                        <p className="text-destructive">{error}</p>
                    </CardContent>
                </Card>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="make" className="text-sm font-medium">
                        Make
                    </label>
                    <Input
                        id="make"
                        type="text"
                        placeholder="e.g., Toyota, Ford, BMW"
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="model" className="text-sm font-medium">
                        Model
                    </label>
                    <Input
                        id="model"
                        type="text"
                        placeholder="e.g., Camry, Focus, X5"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label htmlFor="year" className="text-sm font-medium">
                        Year
                    </label>
                    <Input
                        id="year"
                        type="number"
                        placeholder="e.g., 2020"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        min="1900"
                        max="2030"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="vin" className="text-sm font-medium">
                        VIN (Vehicle Identification Number)
                    </label>
                    <Input
                        id="vin"
                        type="text"
                        placeholder="17-character VIN"
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        maxLength="17"
                        required
                    />
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <Button
                    type="submit"
                    className="flex-1"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Adding Car...
                        </>
                    ) : (
                        <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Car
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}

export default AddCarForm;