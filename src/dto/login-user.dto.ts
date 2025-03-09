import { IsNotEmpty, IsEmail, IsString, MinLength, MaxLength, IsStrongPassword} from 'class-validator';

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @IsStrongPassword({
        minUppercase: 1,
        minLowercase: 1,
    })
    password: string;
}