import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Order } from '../Orders/orders.entity';
import { Products } from '../Products/products.entity';

@Entity({
  name: 'orderDetails'  
})
export class OrderDetail {

    @PrimaryGeneratedColumn('uuid')
    id: string = uuid();

    @Column({
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    })
    price: number;

    @OneToOne(() => Order, (order) => order.orderDetail)
    order: Order

    @ManyToMany(() => Products)
    @JoinTable({
      name: 'order_details_products'
    })
    products: Products[]
};