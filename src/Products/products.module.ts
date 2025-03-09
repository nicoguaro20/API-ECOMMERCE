import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './products.entity';
import { Category } from '../Categories/categories.entity';
import { ProductService } from './products.services';
import { ProductsRepository } from './products.repository';
import { ProductsController } from './products.controllers';

@Module({
  imports: [TypeOrmModule.forFeature([Products, Category])],
  providers: [ProductService, ProductsRepository],
  controllers: [ProductsController],
  exports: [ProductsRepository],
})
export class ProductsModule {}