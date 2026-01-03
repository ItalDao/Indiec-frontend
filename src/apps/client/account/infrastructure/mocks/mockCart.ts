import type { CartItem } from '../../domain/models/CartItem';
import { mockProducts } from '../../../store/infrastructure/mocks/mockProducts';

export const mockCartItems: CartItem[] = [
  {
    product: mockProducts[0],
    quantity: 2,
    size: 'M',
    color: 'Negro',
  },
];
