import styles from './ProfileNotifications.module.css';

interface Props<T> {
  notifications: T;
  onToggle: (key: keyof T) => void;
}

export const ProfileNotifications = <T extends Record<string, boolean>>({
  notifications,
  onToggle
}: Props<T>) => {
  return (
    <div className={styles.container}>
      {Object.entries(notifications).map(([key, value]) => (
        <label key={key} className={styles.notificationLabel}>
          <input
            type="checkbox"
            checked={value}
            onChange={() => onToggle(key as keyof T)}
          />
          {key}
        </label>
      ))}
    </div>
  );
};
