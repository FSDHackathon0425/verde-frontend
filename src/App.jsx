import { Routes, Route, Link } from "react-router-dom";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart"; 
import ShawarmaLogo from "./assets/Shawarma_Express_Logo.png";
import { useCart } from "./context/CartContext";

function App() {
  const { totalItems } = useCart();
  
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="p-4 bg-white shadow-md flex items-center gap-4">
        <img
          src={ShawarmaLogo}
          alt="Shawarma Express Logo"
          className="h-12" 
        />
        <Link to="/" className="text-blue-600 font-bold">Menú</Link>
        <Link to="/cart" className="text-blue-600 font-bold flex items-center gap-1">
          Carrito
          {totalItems > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;