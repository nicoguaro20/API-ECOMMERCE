import { Body, Controller, Get, Param, Post, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';
import { AuthGuard } from 'src/Auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrderService) {};

    @Post()
    @UseGuards(AuthGuard)
    addOrder(@Body() order: CreateOrderDto){
        const { userId, products} = order
        return this.orderService.addOrder(userId, products)
    };

    @Get()
    @UseGuards(AuthGuard)
    getOrder(@Param('id', ParseUUIDPipe)id: string) {
        return this.orderService.getOrder(id)
    };
};