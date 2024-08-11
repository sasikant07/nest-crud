import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail({}, {message: "Please provide valid email"})
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}
