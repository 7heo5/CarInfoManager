import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button-component";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car, Loader2, Save } from "lucide-react";

function EditCar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [vin, setVin] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5257/api/cars/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setMake(data.make);
                setModel(data.model);
                setYear(data.year);
                setVin(data.vin);
                setIsLoadingData(false);
            })
            .catch((err) => {
                setError("Failed to load car.");
                setIsLoadingData(false);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
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
                    <h1 className="text-3xl font-bold tracking-tight">Edit Car</h1>
                    <p className="text-muted-foreground">
                        Update vehicle information
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <Card className="max-w-2xl">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        Vehicle Information
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
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4 mr-2" />
                                        Update Car
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
