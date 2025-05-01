import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { Product } from './products.interface';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private productsRepository: ProductsRepository) {}

  get(page: number, limit: number): Promise<Product[]> {
    return this.productsRepository.get(page, limit);
  };

  getById(id: string): Promise<Product | null> {
    return this.productsRepository.getById(id);
  };

  getByName(name: string): Promise<Product | null> {
    return this.productsRepository.getByName(name);
  };

  createProduct(product: Omit<Product, 'id'>): Promise<string> {
    return this.productsRepository.createProduct(product);
  };

  addProducts() {
    return this.productsRepository.addProducts();
  };

  update(id: string, updateProduct: Omit<Product, 'id'>): Promise<string> {
    return this.productsRepository.update(id, updateProduct);
  };

  remove(id: string): Promise<string> {
    return this.productsRepository.delete(id);
  };
};