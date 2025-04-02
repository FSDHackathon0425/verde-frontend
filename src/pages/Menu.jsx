import { useEffect, useState } from 'react';
import { getMenu } from '../services/api';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await getMenu('123'); // Reemplaza con ID real
        setMenu(data);
      } catch (err) {
        setError('Error al cargar el menú');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <div className="text-center py-8">Cargando menú...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Menú - Shawarma Express</h1>
      <ul className="grid md:grid-cols-2 gap-4">
        {menu.map((item) => (
          <li key={item._id} className="p-4 border rounded-lg bg-white shadow-sm">
            <div>
              <h2 className="text-lg font-semibold">{item.titulo}</h2>
              <p className="text-gray-600 mb-2">{item.descripcion}</p>
              <div className="flex justify-between items-center">
                <p className="text-green-600 font-bold">
                  {item.precio.toFixed(2)} €
                </p>
                <button
                  onClick={() => addToCart({
                    id: item._id,
                    name: item.titulo,
                    description: item.descripcion,
                    price: item.precio
                  })}
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