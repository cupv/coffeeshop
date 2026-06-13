export interface Product {
  id: number;
  name: string;
  type: number;
  price: number;
  image?: string;
  updatedAt: Date;
  createdAt: Date;
}
