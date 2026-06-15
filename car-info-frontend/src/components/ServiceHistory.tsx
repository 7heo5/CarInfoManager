import { useState, useEffect, useCallback, type ChangeEvent } from "react";
import ServiceRecordItem from "./ServiceRecordItem";
import AddServiceRecordForm from "./AddServiceRecordForm";
import ECUCodes from "./ECUCodes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Wrench, Calendar } from "lucide-react";
import { apiUrl } from "@/api/client";
import type { ServiceRecord, ServiceRecordEditForm, ServiceRecordForm } from "@/types";

interface ServiceHistoryProps {
  carId: number;
}

function ServiceHistory({ carId }: ServiceHistoryProps) {
  const [serviceRecords, setServiceRecords] = useState<ServiceRecord[]>([]);
  const [newRecord, setNewRecord] = useState<ServiceRecordForm>({
    date: "",
    serviceType: "",
    notes: "",
    cost: "",
  });
  const [editingRecordId, setEditingRecordId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<ServiceRecordEditForm>({
    date: "",
    serviceType: "",
    notes: "",
    cost: "",
  });

  const fetchServiceRecords = useCallback(async () => {
    try {
      const res = await fetch(apiUrl(`/api/servicerecords/car/${carId}`));
      if (!res.ok) throw new Error("Failed to fetch service records");
      const data = await res.json() as ServiceRecord[];
      setServiceRecords(data);
    } catch (error) {
      console.error("Error loading service records:", error);
    }
  }, [carId]);

  useEffect(() => {
    fetchServiceRecords();
  }, [fetchServiceRecords]);

  const handleRecordChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      const res = await fetch(apiUrl('/api/servicerecords'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recordToSend),
      });

      if (!res.ok) throw new Error('Failed to add service record');
      fetchServiceRecords();
      setNewRecord({ date: '', serviceType: '', notes: '', cost: '' });
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to add service record");
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
              onSubmit={handleAddServiceRecord}
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
