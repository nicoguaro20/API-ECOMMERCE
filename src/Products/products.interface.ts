import { OrderDetail } from '../Orders-details/orders-details.entity';
import { Category } from '../Categories/categories.entity';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imgUrl: string;
    orderDetails: OrderDetail[];
    category: Category;
};