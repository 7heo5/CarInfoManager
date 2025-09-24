// Header.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <h1 className="text-xl font-bold tracking-wide">🚗 Car Service Manager</h1>

        {/* Placeholder to balance layout */}
        <div style={{ width: "28px" }}></div>
      </div>

      {menuOpen && (
        <div className="bg-gray-700 p-4 mt-2 rounded-lg shadow-md space-y-2">
          <button
            className="block text-white w-full text-left hover:text-blue-400"
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
          >
            Dashboard
          </button>
          <button
            className="block text-white w-full text-left hover:text-blue-400"
            onClick={() => {
              navigate("/add");
              setMenuOpen(false);
            }}
          >
            Add New Car
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
