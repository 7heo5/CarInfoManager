import React, { useState } from "react";
import { Button } from "@/components/ui/button-component";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Loader2 } from "lucide-react";

function AddServiceRecordForm({ newRecord, onChange, onSubmit }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onSubmit();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Service Date
              </label>
              <Input
                id="date"
                type="date"
                name="date"
                value={newRecord.date}
                onChange={onChange}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="serviceType" className="text-sm font-medium">
                Service Type
              </label>
              <Input
                id="serviceType"
                type="text"
                name="serviceType"
                placeholder="e.g., Oil Change, Brake Service"
                value={newRecord.serviceType}
                onChange={onChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              placeholder="Additional details about the service..."
              value={newRecord.notes}
              onChange={onChange}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cost" className="text-sm font-medium">
              Cost (£)
            </label>
            <Input
              id="cost"
              type="number"
              name="cost"
              placeholder="0.00"
              value={newRecord.cost}
              onChange={onChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Adding Record...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Add Service Record
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddServiceRecordForm;
