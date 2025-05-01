import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn,  JoinTable } from 'typeorm';
import { OrderDetail } from '../Orders-details/orders-details.entity';
import { Category } from '../Categories/categories.entity';

@Entity({
    name: 'products'
})
export class Products {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 50,
        unique: true,
        nullable: false,
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    description: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false,
    })
    price: number;

    @Column({
        type: 'integer',
        nullable: false,
    })
    stock: number;

    @Column({
        type: 'text',
        default: 'https://coffective.com/others/',
    })
    imgUrl: string;

    @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
    orderDetails: OrderDetail[];

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;
};