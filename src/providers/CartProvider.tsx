import { createContext, useContext, PropsWithChildren, useState } from "react";
import { randomUUID } from "expo-crypto";

import { CartItem, Product, PizzaSize } from "@/app/types";

type CartType = {
  items: CartItem[];
  addItem: (product: Product, size: PizzaSize) => void;
  updateQuantity: (itemId: string, amount: -1 | 1) => void;
};

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
});

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: PizzaSize) => {
    console.log(product);
    const existingItem = items.find(
      (item) => item.product === product && item.size === size
    );
    if (existingItem) {
      updateQuantity(existingItem.id, 1);
      return;
    }

    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    };
    setItems([newCartItem, ...items]);

    console.log(items);
  };

  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    console.log(itemId, amount);
    const updatedItems = items
      .map((item) =>
        item.id !== itemId
          ? item
          : { ...item, quantity: item.quantity + amount }
      )
      .filter((item) => item.quantity > 0);
    setItems(updatedItems);
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
