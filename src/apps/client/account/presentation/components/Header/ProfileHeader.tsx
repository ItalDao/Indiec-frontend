import { Button, Input } from '../../../../../../shared/ui';
import type { User } from '../../../infrastructure/mocks/mockUser';
import styles from './ProfileHeader.module.css';

interface Props {
  user: User;
  onChange: (user: User) => void;
  onPhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
}

export const ProfileHeader = ({
  user,
  onChange,
  onPhotoChange,
  onSave
}: Props) => {
  return (
    <>
      <h3 className={styles.title}>Datos personales</h3>

      <div className={styles.container}>
        <img
          src={user.photo || 'https://via.placeholder.com/100?text=Foto'}
          alt="Foto"
          className={styles.avatar}
        />

        <div className={styles.form}>
          <Input
            label="Nombre"
            value={user.name}
            onChange={e => onChange({ ...user, name: e.target.value })}
          />

          <Input
            label="Email"
            value={user.email}
            onChange={e => onChange({ ...user, email: e.target.value })}
          />

          <div className={styles.row}>
            <Input
              label="Ciudad"
              value={user.city}
              onChange={e => onChange({ ...user, city: e.target.value })}
            />
            <Input
              label="País"
              value={user.country}
              onChange={e => onChange({ ...user, country: e.target.value })}
            />
          </div>

          <label className={styles.photoLabel}>
            Foto de perfil
            <input type="file" accept="image/*" onChange={onPhotoChange} />
          </label>

          <Button size="sm" onClick={onSave}>
            Guardar cambios
          </Button>
        </div>
      </div>
    </>
  );
};
