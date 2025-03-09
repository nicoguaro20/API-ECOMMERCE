import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.services';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    @Get()
    getCategories() {
        return this.categoriesService.get()
    };

    @Get('seeder')
    addCategories() {
        return this.categoriesService.add()
    };

};
