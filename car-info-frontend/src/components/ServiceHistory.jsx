import { useState, useEffect } from "react";
import ServiceRecordItem from "./ServiceRecordItem";
import AddServiceRecordForm from "./AddServiceRecordForm";
import ECUCodes from "./ECUCodes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Wrench, Calendar } from "lucide-react";

function ServiceHistory({ carId }) {
  const [serviceRecords, setServiceRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    date: "",
    serviceType: "",
    notes: "",
    cost: "",
  });
  const [editingRecordId, setEditingRecordId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const fetchServiceRecords = async () => {
    try {
      const res = await fetch(`http://localhost:5257/api/servicerecords/car/${carId}`);
      if (!res.ok) throw new Error("Failed to fetch service records");
      const data = await res.json();
      setServiceRecords(data);
    } catch (error) {
      console.error("Error loading service records:", error);
    }
  };

  useEffect(() => {
    fetchServiceRecords();
  }, [carId]);

  const handleRecordChange = (e) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddServiceRecord = async () => {
    const recordToSend = {
      ...newRecord,
      carId,
      cost: parseFloat(newRecord.cost),
      date: new Date(newRecord.date).toISOString(),
    };

    try {
      const res = await fetch('http://localhost:5257/api/servicerecords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordToSend),
      });

      if (!res.ok) throw new Error('Failed to add service record');
      fetchServiceRecords();
      setNewRecord({ date: '', serviceType: '', notes: '', cost: '' });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Service History Card */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Service History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {serviceRecords.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No service records yet</p>
              <p className="text-sm">Add your first service record to track maintenance</p>
            </div>
          ) : (
            <div className="space-y-4">
              {serviceRecords.map((record) => (
                <ServiceRecordItem
                  key={record.id}
                  record={record}
                  editingRecordId={editingRecordId}
                  setEditingRecordId={setEditingRecordId}
                  editForm={editForm}
                  setEditForm={setEditForm}
                  setServiceRecords={setServiceRecords}
                  refreshServiceHistory={fetchServiceRecords}
                />
              ))}
            </div>
          )}

          <Separator className="my-6" />

          {/* Add New Service Record */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Add New Service Record</h4>
            <AddServiceRecordForm
              newRecord={newRecord}
              onChange={handleRecordChange}
              onSubmit={() => handleAddServiceRecord(carId)}
            />
          </div>
        </CardContent>
      </Card>

      {/* ECU Codes Card */}
      <ECUCodes carId={carId} />
    </div>
  );
}

export default ServiceHistory;
