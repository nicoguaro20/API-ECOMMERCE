import { Controller, Param, Post, UploadedFile, UseInterceptors, ParseFilePipe, UseGuards } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('file-upload')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService) {}

    @Post('uploadImage/:productId')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProduct(
        @Param('id') id: string,
        @UploadedFile(
            new ParseFilePipe({
                validators: [
                    new MaxFileSizeValidator({
                        maxSize: 200000,
                        message: '¡Tamaño de imagen muy grande!',
                    }),
                    new FileTypeValidator({
                        fileType: /(jpg|jpeg|png|webpt)$/,
                    })
                ]
            })
        ) file: Express.Multer.File,
    ) {
        return this.fileUploadService.uploadProductImage(file, id)
    }
};