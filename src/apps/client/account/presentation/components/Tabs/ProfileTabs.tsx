import styles from './ProfileTabs.module.css';

type Section = 'personal' | 'orders' | 'favorites' | 'notifications';

interface Props {
  active: Section;
  onChange: (section: Section) => void;
}

export const ProfileTabs = ({ active, onChange }: Props) => {
  const Tab = ({ id, icon, label }: { id: Section; icon: string; label: string }) => (
    <button
      onClick={() => onChange(id)}
      className={`${styles.tab} ${active === id ? styles.active : ''}`}
    >
      <span className={styles.tabIcon}>{icon}</span>
      {label}
    </button>
  );

  return (
    <div className={styles.container}>
      <Tab id="personal" icon="👤" label="Datos" />
      <Tab id="orders" icon="📦" label="Pedidos" />
      <Tab id="favorites" icon="❤️" label="Favoritos" />
      <Tab id="notifications" icon="🔔" label="Notificaciones" />
    </div>
  );
};
