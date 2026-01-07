import type { PaginaEstaticaRepository } from '../../domain/repositories/PaginaEstaticaRepository';
import type { PaginaEstatica } from '../../domain/entities/PaginaEstatica';

const mockData: PaginaEstatica[] = [
  { 
    id: "1", 
    titulo: "Sobre INDIEC", 
    slug: "sobre-indiec", 
    contenido: "INDIEC es una plataforma de música independiente que conecta artistas emergentes con su audiencia. Promovemos el talento local y ofrecemos herramientas para que los músicos independientes puedan crecer y monetizar su arte.",
    metaDescripcion: "Conoce INDIEC, la plataforma líder de música independiente. Descubre artistas emergentes y apoya el talento local en Ecuador.",
    fechaActualizacion: "2026-01-07",
    visible: true 
  },
  { 
    id: "2", 
    titulo: "Términos y Condiciones", 
    slug: "terminos-condiciones", 
    contenido: "Términos y condiciones de uso de la plataforma INDIEC. Al utilizar nuestros servicios, aceptas cumplir con estos términos...",
    metaDescripcion: "Lee los términos y condiciones de uso de INDIEC. Conoce tus derechos y responsabilidades al usar nuestra plataforma musical.",
    fechaActualizacion: "2026-01-05",
    visible: true 
  },
  { 
    id: "3", 
    titulo: "Política de Privacidad", 
    slug: "politica-privacidad", 
    contenido: "En INDIEC respetamos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal...",
    metaDescripcion: "Política de privacidad de INDIEC. Descubre cómo protegemos tus datos personales y garantizamos tu seguridad en la plataforma.",
    fechaActualizacion: "2026-01-03",
    visible: false 
  },
];

export class StaticPageMock implements PaginaEstaticaRepository {
  private pages: PaginaEstatica[] = [...mockData];

  async getAll(): Promise<PaginaEstatica[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.pages]);
      }, 300);
    });
  }

  async getById(id: string): Promise<PaginaEstatica | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const page = this.pages.find(p => p.id === id) || null;
        resolve(page ? { ...page } : null);
      }, 200);
    });
  }

  async create(page: Omit<PaginaEstatica, 'id'>): Promise<PaginaEstatica> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPage: PaginaEstatica = {
          ...page,
          id: Date.now().toString(),
          fechaActualizacion: new Date().toISOString().split('T')[0],
        };
        this.pages.push(newPage);
        console.log('Página creada (mock):', newPage);
        resolve(newPage);
      }, 500);
    });
  }

  async update(page: PaginaEstatica): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.pages.findIndex(p => p.id === page.id);
        if (index !== -1) {
          this.pages[index] = { 
            ...page,
            fechaActualizacion: new Date().toISOString().split('T')[0]
          };
          console.log('Página actualizada (mock):', this.pages[index]);
        }
        resolve();
      }, 500);
    });
  }

  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.pages = this.pages.filter(p => p.id !== id);
        console.log('Página eliminada (mock):', id);
        resolve();
      }, 400);
    });
  }

  async toggleVisibility(id: string): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const page = this.pages.find(p => p.id === id);
        if (page) {
          page.visible = !page.visible;
          page.fechaActualizacion = new Date().toISOString().split('T')[0];
          console.log('Visibilidad cambiada (mock):', page);
        }
        resolve();
      }, 300);
    });
  }
}