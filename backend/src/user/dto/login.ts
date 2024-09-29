import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Length(4, 50)
  readonly email: string;

  @IsString()
  @Length(8, 32)
  readonly password: string;
}
