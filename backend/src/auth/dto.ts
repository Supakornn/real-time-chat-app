import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class RegisterDto {
    @Field()
    @IsNotEmpty({ message: 'Fullname is required.' })
    @IsString({ message: 'Fullname must be a string.' })
    fullname: string;

    @Field()
    @IsNotEmpty({ message: 'Password is required.' })
    @IsString({ message: 'Password must be a string.' })
    @MinLength(8, { message: 'Password must be at least 8 characters.' })
    password: string;

    @Field()
    @IsNotEmpty({ message: 'Password is required.' })
    @IsString({ message: 'Password must be a string.' })
    confirmPassword: string;

    @Field()
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail({}, { message: 'Email must be valid' })
    email: string;
}

@InputType()
export class LoginDto {
    @Field()
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail({}, { message: 'Email must be valid' })
    email: string;

    @Field()
    @IsNotEmpty({ message: 'Password is required.' })
    @IsString({ message: 'Password must be a string.' })
    password: string;
}
