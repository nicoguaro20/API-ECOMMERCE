import { Body, Controller, Get, Param, Post, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { OrderDetail } from '../Orders-details/orders-details.entity';

@Controller('orders')
@ApiBearerAuth()
export class OrdersController {
    constructor(private orderService: OrderService) {}

    @Post()
    @UseGuards(AuthGuard)
    async addOrder(@Body() order: CreateOrderDto) {
        const { userId, products } = order;
        const newOrder = await this.orderService.addOrder(userId, products);
        return plainToInstance(OrderDetail, newOrder);
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getOrder(@Param('id', ParseUUIDPipe) id: string) {
        const orderDetail = await this.orderService.getOrder(id);
        
        return plainToInstance(OrderDetail, orderDetail);
    }
}