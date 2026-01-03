import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { usePricing } from '../../hooks/usePricing';
import { CartItemCard } from '../../components/Card/CartItemCard';
import { Button, Input } from '../../../../../../shared/ui';
import styles from './CartPage.module.css';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, loading, updateQuantity, removeItem } = useCart();
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const pricing = usePricing(subtotal);
  const [couponInput, setCouponInput] = useState('');

  if (loading) return <p>Cargando carrito...</p>;

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <h2>🛒 Tu carrito está vacío</h2>
        <Button onClick={() => navigate('/client/store')}>
          Ir a la tienda
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🛒 Carrito de Compras</h1>

      {/* Items */}
      <div className={styles.itemsGrid}>
        {items.map(item => (
          <CartItemCard
            key={`${item.product.id}-${item.size}-${item.color}`}
            item={item}
            onQuantityChange={q => updateQuantity(item, q)}
            onRemove={() => removeItem(item)}
          />
        ))}
      </div>

      {/* Cupón */}
      <div className={styles.couponSection}>
        <h3>🎟️ Cupón de descuento</h3>
        <div className={styles.couponInputWrapper}>
          <Input
            placeholder="Ej: INDIE10"
            value={couponInput}
            onChange={e => setCouponInput(e.target.value)}
          />
          <Button
            variant="secondary"
            onClick={() => {
              pricing.applyCoupon(couponInput);
              setCouponInput('');
            }}
          >
            Aplicar
          </Button>
        </div>

        {pricing.error && (
          <p className={styles.errorMessage}>{pricing.error}</p>
        )}

        {pricing.couponCode && (
          <p className={styles.successMessage}>
            Cupón <b>{pricing.couponCode}</b> aplicado (-{pricing.discountPercent}%)
            <Button
              size="sm"
              variant="secondary"
              onClick={pricing.clearCoupon}
            >
              Quitar
            </Button>
          </p>
        )}
      </div>

      {/* Resumen */}
      <div className={styles.summary}>
        <div className={styles.summaryLine}>Subtotal: ${subtotal.toFixed(2)}</div>
        {pricing.discountPercent > 0 && (
          <div className={styles.summaryDiscount}>
            Descuento: -${pricing.discountAmount.toFixed(2)}
          </div>
        )}
        <h2>Total: ${pricing.total.toFixed(2)}</h2>
      </div>

      {/* Acciones */}
      <div className={styles.actions}>
        <Button
          variant="secondary"
          onClick={() => navigate('/client/store')}
        >
          Seguir comprando
        </Button>

        <Button
          variant="primary"
          onClick={() =>
            navigate('/client/checkout', {
              state: { total: pricing.total },
            })
          }
        >
          Continuar al Checkout
        </Button>
      </div>
    </div>
  );
};
