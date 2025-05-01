import { IsEmail, IsNotEmpty, IsEmpty, IsString, IsStrongPassword, MaxLength, MinLength, IsBoolean, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty({ description: 'User name', example: 'Peter Stewart' })
    @IsNotEmpty({ message: 'Name is required!' })
    @IsString({ message: 'Name must be a string!' })
    @MinLength(3, { message: 'Name must be at least 3 characters long!' })
    @MaxLength(80, { message: 'Name must not exceed 80 characters!' })
    name: string;

    @ApiProperty({ description: 'User email address', example: 'user@example.com' })
    @IsNotEmpty({ message: 'Email is required!' })
    @IsEmail({}, { message: 'Email format is invalid!' })
    email: string;

    @ApiProperty({ description: 'User password', example: 'Hello123**' })
    @IsNotEmpty({ message: 'Password is required!' })
    @IsString({ message: 'Password must be a string!' })
    @MinLength(8, { message: 'Password must be at least 8 characters long!' })
    @MaxLength(20, { message: 'Password must not exceed 20 characters!' })
    @IsStrongPassword({
        minUppercase: 1,
        minLowercase: 1,
    }, { message: 'Password must contain at least 1 uppercase and 1 lowercase letter!' })
    password: string;

    @ApiProperty({ description: 'Confirm user password', example: 'Hello123**' })
    @IsNotEmpty({ message: 'Password confirmation is required!' })
    @IsString({ message: 'Password confirmation must be a string!' })
    confirmPassword: string;

    @ApiProperty({ description: 'User country', example: 'Colombia' })
    @IsNotEmpty({ message: 'Country is required!' })
    @IsString({ message: 'Country must be a string!' })
    @MinLength(3, { message: 'Country must be at least 3 characters long!' })
    @MaxLength(80, { message: 'Country must not exceed 80 characters!' })
    country: string;

    @ApiProperty({ description: 'User phone number', example: 3112224455 })
    @IsNotEmpty({ message: 'Phone number is required!' })
    @IsNumber({}, { message: 'Phone number must be a valid number!' })
    phone: number;

    @ApiProperty({ description: 'User address', example: '123 Evergreen Street' })
    @IsNotEmpty({ message: 'Address is required!' })
    @IsString({ message: 'Address must be a string!' })
    @MinLength(3, { message: 'Address must be at least 3 characters long!' })
    @MaxLength(80, { message: 'Address must not exceed 80 characters!' })
    address: string;

    @ApiProperty({ description: 'User city', example: 'Medellín' })
    @IsNotEmpty({ message: 'City is required!' })
    @IsString({ message: 'City must be a string!' })
    @MinLength(3, { message: 'City must be at least 3 characters long!' })
    @MaxLength(20, { message: 'City must not exceed 20 characters!' })
    city: string;

    @IsEmpty()
    isAdmin?: boolean;
}