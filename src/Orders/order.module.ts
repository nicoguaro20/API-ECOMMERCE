import { Module } from '@nestjs/common';
import { OrderService  } from './orders.service';
import { OrdersController } from './orders.controllers';
import { OrdersRepository } from './orders.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDetail } from '../Orders-details/orders-details.entity';
import { Order } from './orders.entity';
import { User } from '../Users/users.entity';
import { Products } from '../Products/products.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([OrderDetail]),
        TypeOrmModule.forFeature([Order]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Products]),
    ],

    providers: [OrderService, OrdersRepository],
    controllers: [OrdersController],
})

export class ordersModule {};