import { createContext, useContext, useState } from "react";
import { createOrder } from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState(null);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setOrderError(null);
  };

  const submitOrder = async (userId) => {
    setIsProcessing(true);
    setOrderError(null);
    
    try {
      const orderData = {
        userId,
        items: cart.map(item => ({
          menuId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: totalPrice
      };

      await createOrder(orderData);
      clearCart();
      return { success: true };
    } catch (error) {
      setOrderError(error.message || 'Error al procesar el pedido');
      return { success: false, error };
    } finally {
      setIsProcessing(false);
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider 
      value={{ 
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        submitOrder,
        clearCart,
        totalItems,
        totalPrice,
        isProcessing,
        orderError
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};