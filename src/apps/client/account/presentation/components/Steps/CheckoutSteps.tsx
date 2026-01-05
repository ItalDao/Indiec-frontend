import styles from './CheckoutSteps.module.css';

interface Props {
  step: number; // Paso activo (0,1,2,3)
}

export const CheckoutSteps = ({ step }: Props) => {
  const steps = ['Datos', 'Envío', 'Pago', 'Confirmación'];

  return (
    <div className={styles.container}>
      {steps.map((label, index) => {
        const isActive = index === step;
        const isCompleted = index < step;

        return (
          <div
            key={label}
            className={`${styles.step} ${isActive ? 'active' : ''}`}
          >
            {/* Indicador circular */}
            <div
              className={`${styles.circle} ${
                isCompleted ? 'completed' : isActive ? 'active' : ''
              }`}
            >
              {isCompleted ? '✓' : index + 1}
            </div>

            {/* Label */}
            <div className={styles.label}>{label}</div>

            {/* Barra debajo */}
            {index < steps.length - 1 && (
              <div
                className={`${styles.bar} ${isCompleted ? 'completed' : ''}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
