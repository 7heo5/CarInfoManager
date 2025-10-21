import { Button } from "@/components/ui/button-component";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Save, X, Calendar, DollarSign, FileText } from "lucide-react";

function ServiceRecordItem({ record, editingRecordId, setEditingRecordId, editForm, setEditForm, setServiceRecords }) {
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updated = {
      ...editForm,
      cost: parseFloat(editForm.cost),
      date: new Date(editForm.date).toISOString(),
    };

    const res = await fetch(`http://localhost:5257/api/servicerecords/${editingRecordId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    if (res.ok) {
      const result = await res.json();
      setServiceRecords((prev) => prev.map((r) => (r.id === result.id ? result : r)));
      setEditingRecordId(null);
    } else {
      alert("Failed to update service record.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this service record?")) {
      return;
    }

    const res = await fetch(`http://localhost:5257/api/servicerecords/${record.id}`, { method: "DELETE" });
    if (res.ok) {
      setServiceRecords((prev) => prev.filter((r) => r.id !== record.id));
    } else {
      alert("Failed to delete record.");
    }
  };

  if (editingRecordId === record.id) {
    return (
      <Card className="border-primary">
        <CardContent className="pt-6">
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Date</label>
                <Input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleEditChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <Input
                  type="text"
                  name="serviceType"
                  value={editForm.serviceType}
                  onChange={handleEditChange}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <textarea
                name="notes"
                value={editForm.notes}
                onChange={handleEditChange}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Cost (£)</label>
              <Input
                type="number"
                name="cost"
                value={editForm.cost}
                onChange={handleEditChange}
                step="0.01"
                min="0"
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingRecordId(null)}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow min-h-[120px]">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start min-h-[80px]">
          <div className="flex-1 space-y-3 pr-4">
            <div className="flex items-center gap-2 flex-wrap">
              <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="font-semibold">
                {new Date(record.date).toLocaleDateString()}
              </span>
              <Badge variant="outline" className="flex-shrink-0">{record.serviceType}</Badge>
            </div>
            
            {record.notes && (
              <div className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground break-words">{record.notes}</p>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <span className="font-medium">£{record.cost}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              onClick={() => {
                setEditingRecordId(record.id);
                setEditForm({
                  id: record.id,
                  carId: record.carId,
                  date: record.date.split('T')[0],
                  serviceType: record.serviceType,
                  cost: record.cost,
                  notes: record.notes,
                });
              }}
              variant="outline"
              size="sm"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              size="sm"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ServiceRecordItem;
