import { useState } from 'react';
import { Card } from '../../../../../../shared/ui';
import { useCheckout } from '../../hooks/useCheckout';
import { useFavorites } from '../../hooks/useFavorites';
import { mockUser, mockUserNotifications } from '../../../infrastructure/mocks/mockUser';
import type { User } from '../../../infrastructure/mocks/mockUser';

import { ProfileTabs } from '../../components/Tabs/ProfileTabs';
import { ProfileHeader } from '../../components/Header/ProfileHeader';
import { ProfileOrders } from '../../components/Orders/ProfileOrders';
import { ProfileFavorites } from '../../components/Favorites/ProfileFavorites';
import { ProfileNotifications } from '../../components/Notifications/ProfileNotifications';

import styles from './ProfilePage.module.css';

type Section = 'personal' | 'orders' | 'favorites' | 'notifications';

export const ProfilePage = () => {
  const { orders = [] } = useCheckout();
  const { favorites, removeFavorite } = useFavorites();

  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('profile_user');
    return saved ? JSON.parse(saved) : mockUser;
  });

  const [notifications, setNotifications] = useState(mockUserNotifications);
  const [section, setSection] = useState<Section>('personal');

  const handleSaveProfile = () => {
    localStorage.setItem('profile_user', JSON.stringify(user));
    alert('Perfil guardado correctamente ✅');
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUser(prev => ({
        ...prev,
        photo: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
      <ProfileTabs active={section} onChange={setSection} />

      <Card className={styles.card}>
        <div className={styles.section}>
          {section === 'personal' && (
            <ProfileHeader
              user={user}
              onChange={setUser}
              onPhotoChange={handlePhotoChange}
              onSave={handleSaveProfile}
            />
          )}

          {section === 'orders' && <ProfileOrders orders={orders} />}

          {section === 'favorites' && (
            <ProfileFavorites
              products={favorites.products}
              onRemove={id => removeFavorite('products', id)}
            />
          )}

          {section === 'notifications' && (
            <ProfileNotifications
              notifications={notifications}
              onToggle={key =>
                setNotifications(prev => ({
                  ...prev,
                  [key]: !prev[key],
                }))
              }
            />
          )}
        </div>
      </Card>
    </div>
  );
};
