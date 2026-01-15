// src/store/index.ts

// Mock Data
export { MOCK_PRODUCTS } from './data/products.mock';
export type { Product } from './domain/models/Product';   // ← Importar desde el lugar oficial



// Presentación

export * from './presentation/pages/ProductFormPage';
export * from './presentation/pages/ProductsPage';       // página principal/admin

export * from './presentation/hooks/useProducts';

// Domain
export * from './domain/models/Product';
export * from './domain/repositories/ProductRepository';

// Infrastructure
export * from './infrastructure/api/ApiProductRepository';