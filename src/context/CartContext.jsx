import { createContext, useEffect, useState, useMemo } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {

  // 🔁 Safe cart loader
  const loadCart = () => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error("Failed to load cart", error);
      localStorage.removeItem("cart");
      return [];
    }
  };

  const [cart, setCart] = useState(loadCart);

  // 💾 Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🧮 Derived data
  const totalQty = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    [cart]
  );

  // ➕ ADD TO CART (stock-safe)
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.productId === product._id
      );

      if (existing) {
        // 🚫 prevent exceeding stock
        if (existing.quantity >= existing.stock) {
          return prev;
        }

        return prev.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product._id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
          quantity: 1,
          stock: product.stock ?? 0,
        },
      ];
    });
  };

  // ➖ REMOVE FROM CART
  const removeFromCart = (productId) => {
    setCart((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  // 🔄 UPDATE QUANTITY (stock-safe)
  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCart((prev) =>
      prev.map((item) => {
        if (item.productId !== productId) return item;

        if (quantity > item.stock) {
          return item; // 🚫 block over-stock
        }

        return { ...item, quantity };
      })
    );
  };

  // 🧹 CLEAR CART
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalQty,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
