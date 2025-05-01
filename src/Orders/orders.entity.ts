import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { OrderDetail } from '../Orders-details/orders-details.entity';
import { User } from '../Users/users.entity';

@Entity({
  name: 'orders'
})
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false})
  date: Date;

  @OneToOne(() => OrderDetail, { cascade: true})
  @JoinColumn({ name: 'orderDetailId' })
  orderDetail: OrderDetail;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;
}