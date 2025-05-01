import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from '../Orders/orders.entity';
import { Products } from '../Products/products.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'order_details' })
export class OrderDetail {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    })
    price: number;

    @Exclude()
    @OneToOne(() => Order, (order) => order.orderDetail)
    order: Order;

    @ManyToMany(() => Products, (product) => product.orderDetails)
    @JoinTable({  name: 'order_details_products' })
    products: Products[]
};