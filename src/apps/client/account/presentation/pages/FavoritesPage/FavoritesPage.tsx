import { useFavorites } from '../../hooks/useFavorites';
import { mockProducts } from '../../../../store/infrastructure/mocks/mockProducts';
import { Card, Button } from '../../../../../../shared/ui';
import { useNavigate } from 'react-router-dom';
import styles from './FavoritesPage.module.css';

export const FavoritesPage = () => {
  const { favorites, loading, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  if (loading) return <p>Cargando favoritos...</p>;

  const favoriteProducts = (favorites.products || [])
    .map((id: number) => mockProducts.find(p => p.id === id))
    .filter(Boolean);

  return (
    <div className={styles.container}>
      <h1>❤️ Favoritos</h1>

      {/* Productos */}
      <Card className={styles.sectionCard}>
        <h3>Productos guardados</h3>
        {favoriteProducts.length === 0 && <p>No hay productos guardados.</p>}
        <ul className={styles.list}>
          {favoriteProducts.map((p: any) => (
            <li key={p.id} className={styles.listItem}>
              <span onClick={() => navigate(`/client/store/${p.id}`)}>
                {p.name}
              </span>
              <div>
                ${p.price.toFixed(2)}
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => removeFavorite('products', p.id)}
                  className={styles.button}
                >
                  Quitar
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Artistas */}
      <Card className={styles.sectionCard}>
        <h3>Artistas guardados</h3>
        <ul className={styles.list}>
          {(favorites.artists || []).map((a: string, i: number) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </Card>

      {/* Canciones */}
      <Card className={styles.sectionCard}>
        <h3>Canciones guardadas</h3>
        <ul className={styles.list}>
          {(favorites.songs || []).map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
