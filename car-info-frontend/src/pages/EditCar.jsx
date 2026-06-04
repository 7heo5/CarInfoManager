import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button-component";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car, Loader2, Save } from "lucide-react";
import { apiUrl } from "@/api/client";

function EditCar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [vin, setVin] = useState("");
    const [customerId, setCustomerId] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerNotes, setCustomerNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        fetch(apiUrl(`/api/cars/${id}`))
            .then((res) => {
                if (!res.ok) throw new Error("Failed to load car.");
                return res.json();
            })
            .then((data) => {
                setMake(data.make);
                setModel(data.model);
                setYear(data.year);
                setVin(data.vin);
                setCustomerId(data.customerId ?? data.customer?.id ?? null);
                setCustomerName(data.customer?.name ?? "");
                setCustomerPhone(data.customer?.phone ?? "");
                setCustomerEmail(data.customer?.email ?? "");
                setCustomerNotes(data.customer?.notes ?? "");
                setIsLoadingData(false);
            })
            .catch(() => {
                setError("Failed to load car.");
                setIsLoadingData(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        const customer = {
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
            notes: customerNotes,
        };

        if (customerId !== null) {
            customer.id = customerId;
        }

        const updatedCar = {
            id: parseInt(id),
            make,
            model,
            year: parseInt(year),
            vin,
            customerId,
            customer,
        };

        try {
            const res = await fetch(apiUrl(`/api/cars/${id}`), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCar),
            });

            if (!res.ok) throw new Error("Failed to update vehicle record.");
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingData) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Dashboard
                </Button>
                <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Vehicle Record</h1>
                    <p className="text-muted-foreground">
                        Update customer and vehicle information
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        Customer and Vehicle Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
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
                                    maxLength="17"
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
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Update Vehicle Record
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default EditCar;
