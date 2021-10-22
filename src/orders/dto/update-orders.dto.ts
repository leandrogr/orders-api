import { IsNotEmpty } from 'class-validator';

export class UpdateOrderDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  order_id: string;

  @IsNotEmpty()
  value: number;
}
