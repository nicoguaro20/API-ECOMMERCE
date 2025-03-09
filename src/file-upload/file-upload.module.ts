import { Module } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileUploadController } from './file-upload.controller';
import { FileUploadRepository } from './file-upload.repository';
import { cloudinaryConfig } from 'src/config/cloudinary';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from '../Products/products.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Products])],
    controllers: [FileUploadController],
    providers: [FileUploadService, FileUploadRepository, cloudinaryConfig],
})

export class FileUploadModule{};
