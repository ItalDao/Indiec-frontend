/**
 * fotografia
 */
export interface CartProduct {
  id: number;
  name: string;
  price: number;
  image: string;
}

/**
 * Item del carrito de compras
 */
export interface CartItem {
  product: CartProduct;
  quantity: number;
  size: string;
  color: string;
}
