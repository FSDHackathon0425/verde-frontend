import { Routes, Route, Link } from "react-router-dom";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart"; 

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="p-4 bg-white shadow-md flex gap-4">
        <Link to="/" className="text-blue-600 font-bold">Menú</Link>
        <Link to="/cart" className="text-blue-600 font-bold">Carrito</Link>
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
