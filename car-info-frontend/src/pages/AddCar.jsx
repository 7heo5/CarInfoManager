import AddCarForm from "../components/AddCarForm";
import { useNavigate } from "react-router-dom";

function AddCar() {
  const navigate = useNavigate();

  const handleCarAdded = () => {
    navigate('/');
  };

  return (
    <div>
      <AddCarForm onCarAdded={handleCarAdded} />
    </div>
  );
}

export default AddCar;
