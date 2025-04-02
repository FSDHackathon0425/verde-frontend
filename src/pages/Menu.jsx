import { useEffect, useState } from "react";

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // Menú de Shawarma Express
    setMenu([
      { id: 1, name: "Ración de Patatas Fritas", description: "Con nuestro toque de especias.", price: 4.90 },
      { id: 2, name: "Shawarma Clásico", description: "Pollo, ternera o mixto con vegetales frescos y salsas exclusivas.", price: 11.40 },
      { id: 3, name: "Menú Shawarma", description: "Incluye shawarma, un acompañante (falafel, tabule o patatas fritas) y bebida.", price: 14.90 },
      { id: 4, name: "Hummus", description: "Hecho con garbanzos, acompañado de pan árabe.", price: 7.40 },
    ]);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Menú - Shawarma Express</h1>
      <ul>
        {menu.map((item) => (
          <li key={item.id} className="p-4 border-b">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600">{item.description}</p>
            <p className="text-green-600 font-bold">{item.price.toFixed(2)} €</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
