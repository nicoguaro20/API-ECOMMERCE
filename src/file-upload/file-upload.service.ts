import { Injectable } from '@nestjs/common';
import { FileUploadRepository } from './file-upload.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from '../Products/products.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileUploadService {
    constructor(
        private readonly fileUploadRepository: FileUploadRepository,
        @InjectRepository(Products)
        private readonly productRepository: Repository<Products>,
    ) {}

    async uploadProductImage(file: Express.Multer.File, ProductId: string) {
        const productExist = await this.productRepository.findOneBy({
            id: ProductId
        });

        if(!productExist) {
            return '¡El producto no existe!';
        };

        const uploadedImage = await this.fileUploadRepository.uploadImage(file);

        await this.productRepository.update(ProductId, {
            imgUrl: uploadedImage.secure_url
        });

        const updateProduct = await this.productRepository.findOneBy({
            id: ProductId
        });

    return updateProduct;

    };
};