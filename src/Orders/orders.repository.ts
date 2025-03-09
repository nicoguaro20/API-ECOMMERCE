import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { OrderDetail } from '../Orders-details/orders-details.entity';
import { User } from '../Users/users.entity';
import { Products } from '../Products/products.entity';

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(OrderDetail)
        private orderDetailsRepository: Repository<OrderDetail>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(Products)
        private productsRepository: Repository<Products>,
    ) {}

    async addOrder(userId: string, products: any) {
        let total = 0;

        const user = await this.usersRepository.findOneBy({ id: userId });
        if (!user) {
            return 'User not found';
        }

        const order = new Order();
        order.date = new Date();
        order.user = user;

        const newOrder = await this.ordersRepository.save(order);

        const productsArray = await Promise.all(
            products.map(async (element) => {
                const product = await this.productsRepository.findOneBy({ id: element.id });

                if (!product) {
                    throw new Error(`Product with id ${element.id} not found`);
                }

                total += Number(product.price);

                await this.productsRepository.update(
                    { id: element.id },
                    { stock: product.stock - 1 },
                );

                return product;
            }),
        );

        const orderDetail = new OrderDetail();
        orderDetail.price = Number(total.toFixed(2));
        orderDetail.products = productsArray;
        orderDetail.order = newOrder;

        await this.orderDetailsRepository.save(orderDetail);

        return this.ordersRepository.findOne({
            where: { id: newOrder.id },
            relations: ['orderDetail', 'orderDetail.products'],
        });
    };

    getOrder (id: string) {
        const order = this.ordersRepository.findOne({
            where: { id },
            relations: {
                orderDetail: {
                    products: true,
                },
            },
        })

        if (!order) {
            return 'Order not found'
        }

        return order
    };

};