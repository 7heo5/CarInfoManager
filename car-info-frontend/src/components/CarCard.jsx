import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function CarCard({ car, onViewServiceHistory, onDelete, onEdit, expanded }) {
  return (
    <motion.div
      layout
      className="bg-gray-800 rounded-2xl p-6 shadow-lg text-white relative hover:shadow-2xl transition-shadow"
    >
      <div className="mb-4">
        <h3 className="text-xl font-semibold">{car.make} {car.model}</h3>
        <p className="text-sm text-gray-400">{car.year} | VIN: {car.vin}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Link
          to={`/edit/${car.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded-full"
        >
          Edit
        </Link>
        <button
          onClick={() => onDelete(car.id)}
          className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded-full"
        >
          Delete
        </button>
        <button
          onClick={() => onViewServiceHistory(car.id)}
          className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded-full ml-auto"
        >
          {expanded ? "Hide Service History" : "View Service History"}
        </button>
      </div>
    </motion.div>
  );
}

export default CarCard;