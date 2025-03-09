import { IsEmail, IsNotEmpty, IsEmpty, IsNumber, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    @IsStrongPassword({
        minUppercase: 1,
        minLowercase: 1,
    })
    password: string

    @IsNotEmpty()
    confirmPassword: string
   
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    country: string

    @IsNotEmpty()
    @IsString()
    phone: number

   @IsNotEmpty()
   @IsString()
   @MinLength(3)
   @MaxLength(80)
   address: string

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string

    @IsEmpty()
    isAdmin?: boolean

};