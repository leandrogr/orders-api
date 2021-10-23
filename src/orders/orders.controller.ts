import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async index() {
    return await this.ordersService.findAll();
  }

  @Post()
  async store(@Body() body: CreateOrderDto) {
    return await this.ordersService.store(body);
  }

  // @Get(':id')
  // async show(@Param('id') id: number) {
  //   return await this.ordersService.findOneOrFail({ id });
  // }

  @Get(':id')
  async findByOrderId(@Param('id') id: string) {
    return await this.ordersService.findByOrderId(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateOrderDto) {
    return await this.ordersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    await this.ordersService.destroy(id);
  }
}
