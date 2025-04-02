import { useCart } from '../context/CartContext';
import { useEffect } from 'react';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    submitOrder,
    totalPrice,
    totalItems,
    isProcessing,
    orderError,
    clearCart
  } = useCart();

  const [userId] = useState('123'); // Reemplaza con tu sistema de autenticación

  const handleSubmit = async () => {
    const result = await submitOrder(userId);
    if (result.success) {
      // Opcional: Mostrar confirmación
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      
      {orderError && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          {orderError}
        </div>
      )}

      {cart.length === 0 ? (
        <p className="text-gray-600">Tu carrito está vacío.</p>
      ) : (
        <div className="space-y-4">
          <ul className="divide-y divide-gray-200">
            {cart.map((item) => (
              <li key={item.id} className="py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-bold">
                      {(item.price * item.quantity).toFixed(2)} €
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 px-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 bg-red-600 text-white py-1 px-3 rounded text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Total:</h3>
              <p className="text-xl font-bold text-green-600">
                {totalPrice.toFixed(2)} €
              </p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className={`mt-4 w-full py-2 px-4 rounded text-white ${
                isProcessing ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isProcessing ? 'Procesando...' : 'Finalizar Pedido'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;