import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button-component";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";
import { apiUrl } from "@/api/client";
import type { Car, NewCar } from "@/types";

interface AddCarFormProps {
    onCarAdded: (car: Car) => void;
}

function AddCarForm({ onCarAdded }: AddCarFormProps) {
    // Track form field values
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [vin, setVin] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerNotes, setCustomerNotes] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        //Create car object
        const newCar: NewCar = {
            make,
            model,
            year: parseInt(year),
            vin,
            customer: {
                name: customerName,
                phone: customerPhone,
                email: customerEmail,
                notes: customerNotes,
            },
        };

        try {
            const res = await fetch(apiUrl('/api/cars'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCar),
            });

            if (!res.ok) {
                throw new Error('Failed to add car');
            }

            const createdCar = await res.json() as Car;
            onCarAdded(createdCar); // Notify parent to update list

            // Clear the form
            setMake('');
            setModel('');
            setYear('');
            setVin('');
            setCustomerName('');
            setCustomerPhone('');
            setCustomerEmail('');
            setCustomerNotes('');
            setError('');
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to add car");
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
            
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Customer Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="customerName" className="text-sm font-medium">
                            Customer Name
                        </label>
                        <Input
                            id="customerName"
                            type="text"
                            placeholder="e.g., Taylor Motors or Sam Green"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="customerPhone" className="text-sm font-medium">
                            Phone
                        </label>
                        <Input
                            id="customerPhone"
                            type="tel"
                            placeholder="Customer contact number"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label htmlFor="customerEmail" className="text-sm font-medium">
                            Email
                        </label>
                        <Input
                            id="customerEmail"
                            type="email"
                            placeholder="customer@example.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="customerNotes" className="text-sm font-medium">
                            Customer Notes
                        </label>
                        <Input
                            id="customerNotes"
                            type="text"
                            placeholder="Preferred contact, fleet account, etc."
                            value={customerNotes}
                            onChange={(e) => setCustomerNotes(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Vehicle Details</h3>
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
                        maxLength={17}
                        required
                    />
                </div>
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
                            Adding Vehicle...
                        </>
                    ) : (
                        <>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Vehicle Record
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}

export default AddCarForm;
