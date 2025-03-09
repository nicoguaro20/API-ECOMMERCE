import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.services';
import { CategoriesRepository } from './categories.respository';
import { Category } from './categories.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoriesController],
    providers: [CategoriesService, CategoriesRepository],
})

export class CategoriesModule{};