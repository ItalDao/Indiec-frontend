import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkout } from '../../../application/usecases/checkout';
import { orderApi } from '../../../infrastructure/api/orderApi';
import { CheckoutSteps } from '../../components/Steps/CheckoutSteps';
import { Button, Input, Card } from '../../../../../../shared/ui';
import { useCart } from '../../hooks/useCart';
import styles from './CheckoutPage.module.css';

export const CheckoutPage = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { items, subtotal, discountAmount, total: cartTotal } = useCart();

  const [shippingMethod, setShippingMethod] =
    useState<'standard' | 'express'>('standard');

  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    payment: 'card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const handleConfirm = async () => {
    const execute = checkout(orderApi);
    const shippingCost = shippingMethod === 'express' ? 15 : 5;
    const totalWithShipping = cartTotal + shippingCost;

    const orderResult = await execute({
      ...form,
      shippingMethod,
      shippingCost,
      total: totalWithShipping,
    });

    navigate(`/client/orders/${orderResult.id}`);
  };

  return (
    <div className={styles.container}>
      <CheckoutSteps step={step} />

      {/* PASO 1 - DATOS */}
      {step === 0 && (
        <Card title="Datos de envío">
          <div className={styles.stepCardContent}>
            <Input
              label="Nombre completo"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
            <Input
              label="Dirección"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
            />
            <Input
              label="Ciudad"
              value={form.city}
              onChange={e => setForm({ ...form, city: e.target.value })}
            />
            <Button onClick={() => setStep(1)}>Continuar</Button>
          </div>
        </Card>
      )}

      {/* PASO 2 - ENVÍO */}
      {step === 1 && (
        <Card title="Método de envío">
          <div className={styles.stepCardContent}>
            <label>
              <input
                type="radio"
                checked={shippingMethod === 'standard'}
                onChange={() => setShippingMethod('standard')}
              />{' '}
              🚚 Envío estándar ($5)
            </label>

            <label>
              <input
                type="radio"
                checked={shippingMethod === 'express'}
                onChange={() => setShippingMethod('express')}
              />{' '}
              ⚡ Envío express ($15)
            </label>

            <Button onClick={() => setStep(2)}>Continuar</Button>
          </div>
        </Card>
      )}

      {/* PASO 3 - PAGO */}
      {step === 2 && (
        <Card title="Método de pago">
          <div className={styles.stepCardContent}>
            {/* TARJETA */}
            <label
              className={`${styles.paymentOption} ${
                form.payment === 'card' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                checked={form.payment === 'card'}
                onChange={() => setForm({ ...form, payment: 'card' })}
              />{' '}
              💳 Tarjeta de crédito / débito

              {form.payment === 'card' && (
                <div className={styles.paymentDetails}>
                  <Input
                    label="Número de tarjeta"
                    placeholder="1234 5678 9012 3456"
                    value={form.cardNumber}
                    onChange={e =>
                      setForm({ ...form, cardNumber: e.target.value })
                    }
                  />
                  <Input
                    label="Nombre en la tarjeta"
                    value={form.cardName}
                    onChange={e =>
                      setForm({ ...form, cardName: e.target.value })
                    }
                  />
                  <div className={styles.paymentRow}>
                    <Input
                      label="Expiración"
                      placeholder="MM/AA"
                      value={form.expiry}
                      onChange={e => setForm({ ...form, expiry: e.target.value })}
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      value={form.cvv}
                      onChange={e => setForm({ ...form, cvv: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </label>

            {/* PAYPAL */}
            <label
              className={`${styles.paymentOption} ${
                form.payment === 'paypal' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                checked={form.payment === 'paypal'}
                onChange={() => setForm({ ...form, payment: 'paypal' })}
              />{' '}
              🅿️ PayPal
              <p style={{ fontSize: '0.85rem', color: '#666' }}>
                Serás redirigido a PayPal para completar el pago
              </p>
            </label>

            {/* CONTRA ENTREGA */}
            <label
              className={`${styles.paymentOption} ${
                form.payment === 'cash' ? 'active' : ''
              }`}
            >
              <input
                type="radio"
                checked={form.payment === 'cash'}
                onChange={() => setForm({ ...form, payment: 'cash' })}
              />{' '}
              💵 Pago contra entrega
              <p style={{ fontSize: '0.85rem', color: '#666' }}>
                Paga al recibir tu pedido
              </p>
            </label>

            <Button onClick={() => setStep(3)}>Continuar</Button>
          </div>
        </Card>
      )}

      {/* PASO 4 - RESUMEN */}
      {step === 3 && (
        <Card title="Resumen del pedido">
          <ul className={styles.summaryList}>
            {items.map((it, idx) => (
              <li key={idx}>
                {it.product.name} — {it.quantity} × ${it.product.price.toFixed(2)}
              </li>
            ))}
          </ul>

          <div className={styles.summaryInfo}>
            <div>Subtotal: ${subtotal.toFixed(2)}</div>
            <div>Descuento: ${discountAmount.toFixed(2)}</div>
            <div>Envío: ${shippingMethod === 'express' ? 15 : 5}</div>
          </div>

          <h2 className={styles.total}>
            Total: ${(cartTotal + (shippingMethod === 'express' ? 15 : 5)).toFixed(2)}
          </h2>

          <Button onClick={handleConfirm}>Confirmar Pedido</Button>
        </Card>
      )}
    </div>
  );
};
