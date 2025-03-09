import { ArrayMinSize, IsNotEmpty, IsUUID, IsArray } from 'class-validator';
import { Products } from '../Products/products.entity';

export class CreateOrderDto  {
    @IsNotEmpty()
    @IsUUID()
    userId: string

    @IsArray()
    @ArrayMinSize(1)
    products: Partial<Products[]>

};