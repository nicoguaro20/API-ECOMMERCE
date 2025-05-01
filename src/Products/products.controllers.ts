import { Controller, Delete, Get, HttpCode, Post, Put, Query, Param, Body, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { ProductService } from './products.services';
import { Product } from './products.interface';
import { validateProduct } from 'src/utils/validate';
import { Roles } from 'src/decorators/role/decorators.role';
import { Role } from 'src/enum/roles.enum';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { RolesGuard } from 'src/Auth/guards/roles.guard';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProductDto } from '../dto/create-product.dto';
 
@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productServices: ProductService) {}

    @HttpCode(200)
    @Get()
    getProducts(@Query('page')page: number,@Query('limit')limit: number) {
        return this.productServices.get(page, limit);
    };

    @Get('seeder')
    addProducts() {
        return this.productServices.addProducts()
    };

    @HttpCode(200)
    @Get(':id')
    getProductById(@Param('id', ParseUUIDPipe) id: string) {
        return this.productServices.getById(id);
    };

    @ApiBearerAuth()
    @HttpCode(201)
    @Post()
    createProduct(@Body() product: Product) {
        if (validateProduct(product)) {
            return this.productServices.createProduct(product);
        }
        return 'Producto no válido';
    };
    
    @ApiBearerAuth()
    @HttpCode(200)
    @Put(':id')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateProduct: Omit<Product, 'id'>) {
        if (validateProduct(updateProduct)) {
            return this.productServices.update(id, updateProduct);
        }
        return 'Producto no válido';
    };

    @ApiBearerAuth()
    @HttpCode(200)
    @Delete(':id')
    @UseGuards(AuthGuard)
    remove(@Param('id', ParseUUIDPipe) id: string) {
        return this.productServices.remove(id);
    };
};