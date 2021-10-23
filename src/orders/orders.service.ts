import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, FindOneOptions, Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-orders.dto';
import { UpdateOrderDto } from './dto/update-orders.dto';
import { OrdersEntity } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>,
  ) {}

  async findAll() {
    return await this.ordersRepository.find({
      select: ['id', 'createdAt', 'name', 'order_id', 'value'],
    });
  }

  async findOneOrFail(
    conditions: FindConditions<OrdersEntity>,
    options?: FindOneOptions<OrdersEntity>,
  ) {
    try {
      return await this.ordersRepository.findOneOrFail(conditions, options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findByOrderId(id) {
    return await this.ordersRepository.find({
      where: { order_id: id },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async store(data: CreateOrderDto) {
    const user = this.ordersRepository.create(data);
    return await this.ordersRepository.save(user);
  }

  async update(id: number, data: UpdateOrderDto) {
    const user = await this.findOneOrFail({ id });
    this.ordersRepository.merge(user, data);
    return await this.ordersRepository.save(user);
  }

  async destroy(id: number) {
    await this.ordersRepository.findOneOrFail({ id });
    this.ordersRepository.softDelete({ id });
  }
}
