import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button-component";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Wrench, ChevronDown, ChevronUp } from "lucide-react";
import { getCarLogoComponent } from "@/components/CarLogos";

function CarCard({ car, onViewServiceHistory, onDelete, onEdit, expanded }) {
  return (
    <motion.div layout className="w-full">
      <Card className="hover:shadow-lg transition-shadow h-full min-h-[200px] flex flex-col">
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-start gap-3">
            <div className="bg-zinc-700 flex h-12 w-12 items-center justify-center rounded-lg bg-muted flex-shrink-0">
              {getCarLogoComponent(car.make, "w-8 h-8")}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg font-bold">{car.make} {car.model}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-muted-foreground">{car.year}</p>
                <span className="text-muted-foreground">•</span>
                <Badge variant="outline" className="text-xs">
                  VIN: {car.vin.slice(0, 8)}...
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0 flex-1 flex flex-col justify-end">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => onEdit(car.id)}
              variant="outline"
              size="sm"
              className="flex-1 min-w-[80px]"
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              onClick={() => onDelete(car.id)}
              variant="destructive"
              size="sm"
              className="flex-1 min-w-[80px]"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <Button
              onClick={() => onViewServiceHistory(car.id)}
              variant="secondary"
              size="sm"
              className="flex-1 min-w-[120px]"
            >
              <Wrench className="h-4 w-4 mr-1" />
              {expanded ? (
                <>
                  <ChevronUp className="h-4 w-4 ml-1" />
                  Hide
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 ml-1" />
                  Service
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CarCard;