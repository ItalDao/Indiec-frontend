import { useState, useEffect } from 'react';
import type { CatalogItem, CatalogType } from '../../domain/entities/Catalog';
import { getAllCatalogItems } from '../../application/use-cases/getAllCatalogItems';
import { createCatalogItem } from '../../application/use-cases/createCatalogItem';
import { updateCatalogItem } from '../../application/use-cases/updateCatalogItem';
import { deleteCatalogItem } from '../../application/use-cases/deleteCatalogItem';
import { CatalogMock } from '../../infrastructure/mocks/CatalogMock';

const repository = new CatalogMock();

export const useCatalogs = (type: CatalogType) => {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const getAll = getAllCatalogItems(repository);
      const data = await getAll(type);
      setItems(data);
    } catch (err) {
      setError('Error al cargar catálogo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (item: Omit<CatalogItem, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const create = createCatalogItem(repository);
      const newItem = await create(type, item);
      setItems([...items, newItem]);
      return true;
    } catch (err) {
      setError('Error al crear item');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (item: CatalogItem) => {
    try {
      setLoading(true);
      setError(null);
      const update = updateCatalogItem(repository);
      await update(type, item);
      setItems(items.map(i => i.id === item.id ? item : i));
      return true;
    } catch (err) {
      setError('Error al actualizar item');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const deleteUseCase = deleteCatalogItem(repository);
      await deleteUseCase(type, id);
      setItems(items.filter(i => i.id !== id));
      return true;
    } catch (err) {
      setError('Error al eliminar item');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, [type]);

  return {
    items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    reloadItems: loadItems,
  };
};