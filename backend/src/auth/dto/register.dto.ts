import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, {message: "Please provide valid email"})
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
