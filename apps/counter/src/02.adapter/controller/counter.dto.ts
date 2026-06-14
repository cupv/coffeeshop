export interface CreateOrderDto {
  source: number;
  memberId: string;
  lines: {
    type: number;
    name: string;
    price: number;
    status: number;
  }[];
}
