import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import CarCard from "../components/CarCard";
import ServiceHistory from "../components/ServiceHistory";
import { Button } from "@/components/ui/button-component";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getCarLogoComponent } from "@/components/CarLogos";

function Dashboard() {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const [expandedCarId, setExpandedCarId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5257/api/cars')
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load cars.");
        return res.json();
      })
      .then((data) => setCars(data))
      .catch((err) => {
        console.error("Error loading cars:", err);
        setError("Failed to load cars.");
      });
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5257/api/cars/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setCars((prev) => prev.filter((c) => c.id !== id));
    } else {
      alert('Failed to delete car.');
    }
  };

  const toggleServiceHistory = (carId) => {
    setExpandedCarId(expandedCarId === carId ? null : carId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your vehicle fleet and track maintenance
          </p>
        </div>
        <Button onClick={() => navigate("/add")}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Car
        </Button>
      </div>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Car Cards */}
      {cars.length > 0 ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                onEdit={() => navigate(`/edit/${car.id}`)}
                onDelete={handleDelete}
                onViewServiceHistory={toggleServiceHistory}
                expanded={expandedCarId === car.id}
              />
            ))}
          </div>
          
          {/* Service History Section */}
          {expandedCarId && (
            <div className="mt-8 max-w-6xl mx-auto">
              <ServiceHistory carId={expandedCarId} />
            </div>
          )}
        </div>
      ) : (
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted mx-auto mb-4">
              {getCarLogoComponent('default', "w-12 h-12")}
            </div>
            <h3 className="text-lg font-semibold mb-2">No cars added yet</h3>
            <p className="text-muted-foreground mb-4">
              Get started by adding your first vehicle to track
            </p>
            <Button onClick={() => navigate("/add")}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Car
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Dashboard;
