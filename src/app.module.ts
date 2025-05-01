import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './Products/products.module';
import { UsersModule } from './Users/users.module';
import { AuthModule } from './Auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import typeorm from './config/typeorm';
import { CategoriesModule } from './Categories/categories.module';
import { ordersModule } from './Orders/order.module';
import { AppService } from './app.service';
import { FileUploadModule } from './file-upload/file-upload.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('typeorm'),
        autoLoadEntities: true,
      }),
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' }
    }),
    ProductsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
    ordersModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}