import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.respository';

@Injectable()
export class CategoriesService {
    constructor(private categoriesRepository: CategoriesRepository) {}

    get() {
        return this.categoriesRepository.getCategories()
    };

    add() {
        return this.categoriesRepository.addCategories()
    };
};