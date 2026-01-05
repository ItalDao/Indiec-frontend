import { useEffect, useState } from 'react';
import type { CartItem } from '../../domain/models/CartItem';
import { cartApi } from '../../infrastructure/api/cartApi';
import { getCart } from '../../application/usecases/getCart';
import { updateCartItem } from '../../application/usecases/updateCartItem';
import { removeCartItem } from '../../application/usecases/removeCartItem';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Cupones
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  // 🔹 Cargar carrito
  const load = async () => {
    setLoading(true);
    const execute = getCart(cartApi);
    const data = await execute();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  // 🔹 Actualizar cantidad
  const updateQuantity = async (item: CartItem, quantity: number) => {
    const execute = updateCartItem(cartApi);
    await execute({ ...item, quantity });
    await load();
  };

  // 🔹 Eliminar item
  const removeItem = async (item: CartItem) => {
    const execute = removeCartItem(cartApi);
    await execute(item);
    await load();
  };

  // 🔹 Subtotal
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // 🔹 Descuento
  const discountAmount = (subtotal * discountPercent) / 100;

  // 🔹 Total
  const total = subtotal - discountAmount;

  // 🔹 Aplicar cupón
  const applyCoupon = (code: string): boolean => {
    if (code === 'INDIEC10') {
      setCouponCode(code);
      setDiscountPercent(10);
      return true;
    }

    if (code === 'INDIEC20') {
      setCouponCode(code);
      setDiscountPercent(20);
      return true;
    }

    return false;
  };

  // 🔹 Limpiar cupón
  const clearCoupon = () => {
    setCouponCode(null);
    setDiscountPercent(0);
  };

  return {
    items,
    loading,
    updateQuantity,
    removeItem,
    subtotal,
    discountPercent,
    discountAmount,
    total,
    couponCode,
    applyCoupon,
    clearCoupon,
  };
};
