import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  order_id: string;

  @IsNotEmpty()
  value: number;
}
