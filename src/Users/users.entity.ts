import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn } from 'typeorm';
import { Order } from '../Orders/orders.entity';

@Entity({
  name: 'users'  
})
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 50,
        nullable: false,
        unique: true,
    })
    email: string;

    @Column({
        type:'varchar',
        nullable: false,
    })
    password: string;

    @Column({
        type: 'text'
    })
    address: string;

    @Column({
        type: 'text'
    })
    phone: number;

    @Column({
        type: 'varchar',
        length: 50,
    })
    country: string;


    @Column({
        type: 'varchar',
        length: 50,
    })
    city: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    isAdmin: boolean;

    @CreateDateColumn({
        type: 'date',
    })
    createdAt: Date;

    @OneToMany(() => Order, (order) => order.user)
    orders: Order[]

};