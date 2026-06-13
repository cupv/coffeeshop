export interface CreateOrderDto {
  source: number;
  memberId: string;
  status: number;
  lines: {
    type: number;
    name: string;
    price: number;
    status: number;
  }[];
}
