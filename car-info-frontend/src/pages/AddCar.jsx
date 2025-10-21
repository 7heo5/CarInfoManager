import AddCarForm from "../components/AddCarForm";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-component";
import { ArrowLeft, Car } from "lucide-react";

function AddCar() {
  const navigate = useNavigate();

  const handleCarAdded = () => {
    navigate('/');
  };

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
          <h1 className="text-3xl font-bold tracking-tight">Add New Car</h1>
          <p className="text-muted-foreground">
            Add a new vehicle to your fleet
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
          <AddCarForm onCarAdded={handleCarAdded} />
        </CardContent>
      </Card>
    </div>
  );
}

export default AddCar;
