import { useState } from 'react';

/**
 * Hook de precios y cupones (solo UI logic)
 */
export const usePricing = (subtotal: number) => {
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    setError(null);

    if (normalized === 'INDIE10') {
      setCouponCode(normalized);
      setDiscountPercent(10);
      return true;
    }

    if (normalized === 'INDIE20' && subtotal >= 100) {
      setCouponCode(normalized);
      setDiscountPercent(20);
      return true;
    }

    setError('Cupón inválido o no cumple condiciones');
    return false;
  };

  const clearCoupon = () => {
    setCouponCode(null);
    setDiscountPercent(0);
    setError(null);
  };

  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount;

  return {
    couponCode,
    discountPercent,
    discountAmount,
    total,
    error,
    applyCoupon,
    clearCoupon,
  };
};
