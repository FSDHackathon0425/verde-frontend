import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useCart();
  
  useEffect(() => {
    setMenu([
      { id: 1, name: "Ración de Patatas Fritas", description: "Con nuestro toque de especias.", price: 4.90 },
      { id: 2, name: "Shawarma Clásico", description: "Pollo, ternera o mixto con vegetales frescos y salsas exclusivas.", price: 11.40 },
      { id: 3, name: "Menú Shawarma", description: "Incluye shawarma, un acompañante (falafel, tabule o patatas fritas) y bebida.", price: 14.90 },
      { id: 4, name: "Hummus", description: "Hecho con garbanzos, acompañado de pan árabe.", price: 7.40 },
    ]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Menú - Shawarma Express</h1>
      <ul className="grid md:grid-cols-2 gap-4">
        {menu.map((item) => (
          <li key={item.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <p className="text-green-600 font-bold">{item.price.toFixed(2)} €</p>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700"
                >
                  Añadir
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;