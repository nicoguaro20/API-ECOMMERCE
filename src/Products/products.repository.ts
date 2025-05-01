import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../Categories/categories.entity';
import * as data from '../utils/seeders/data.json';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Products } from './products.entity';
import { CreateProductDto } from 'src/dto/create-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async get(page: number = 1, limit: number = 5): Promise<Products[]> {
    return this.productsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getById(id: string): Promise<Products | null> {
    return this.productsRepository.findOne({ where: { id } });
  };

  async getByName(name: string): Promise<Products | null> {
    return this.productsRepository.findOne({ where: { name } });
  };

  async addProducts() {
    const categories = await this.categoriesRepository.find();

    for (const element of data) {
      const relatedCategory = categories.find(
        (category) => category.name === element.category,
      );

      if (!relatedCategory) {
        throw new NotFoundException(`Category ${element.category} not found`);
      }

      const product = this.productsRepository.create({
        name: element.name,
        description: element.description,
        price: element.price,
        stock: element.stock,
        category: relatedCategory,
      });

      await this.productsRepository
        .createQueryBuilder()
        .insert()
        .into(Products)
        .values(product)
        .orUpdate(['description', 'price', 'stock'], ['name'])
        .execute();
    }

    return 'Productos agregados';
  };

  async createProduct(product: Partial<Products>): Promise<string> {
    const newProduct = this.productsRepository.create(product);
    const result = await this.productsRepository.save(newProduct);
    return result.id;
  };

  async update(id: string, updateProduct: Omit<Products, 'id'>): Promise<string> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);

    await this.productsRepository.update(id, updateProduct);
    return id;
  };

  async delete(id: string): Promise<string> {
    const result = await this.productsRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return id;
  };
};