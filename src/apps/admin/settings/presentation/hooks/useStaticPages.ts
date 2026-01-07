import { useState, useEffect } from 'react';
import type { PaginaEstatica } from '../../domain/entities/PaginaEstatica';
import { getAllStaticPages } from '../../application/use-cases/getAllStaticPages';
import { createStaticPage } from '../../application/use-cases/createStaticPage';
import { updateStaticPage } from '../../application/use-cases/updateStaticPage';
import { deleteStaticPage } from '../../application/use-cases/deleteStaticPage';
import { toggleStaticPageVisibility } from '../../application/use-cases/toggleStaticPageVisibility';
import { StaticPageMock } from '../../infrastructure/mocks/StaticPageMock';

const repository = new StaticPageMock();

export const useStaticPages = () => {
  const [pages, setPages] = useState<PaginaEstatica[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPages = async () => {
    try {
      setLoading(true);
      setError(null);
      const getAll = getAllStaticPages(repository);
      const data = await getAll();
      setPages(data);
    } catch (err) {
      setError('Error al cargar páginas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createPage = async (page: Omit<PaginaEstatica, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const create = createStaticPage(repository);
      const newPage = await create(page);
      setPages([...pages, newPage]);
      return true;
    } catch (err) {
      setError('Error al crear página');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updatePage = async (page: PaginaEstatica) => {
    try {
      setLoading(true);
      setError(null);
      const update = updateStaticPage(repository);
      await update(page);
      setPages(pages.map(p => p.id === page.id ? page : p));
      return true;
    } catch (err) {
      setError('Error al actualizar página');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deletePage = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const deleteUseCase = deleteStaticPage(repository);
      await deleteUseCase(id);
      setPages(pages.filter(p => p.id !== id));
      return true;
    } catch (err) {
      setError('Error al eliminar página');
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id: string) => {
    try {
      const toggle = toggleStaticPageVisibility(repository);
      await toggle(id);
      setPages(pages.map(p => p.id === id ? { ...p, visible: !p.visible } : p));
      return true;
    } catch (err) {
      setError('Error al cambiar visibilidad');
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    loadPages();
  }, []);

  return {
    pages,
    loading,
    error,
    createPage,
    updatePage,
    deletePage,
    toggleVisibility,
    reloadPages: loadPages,
  };
};