import { IsString, Length, IsEmail, Matches } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(3, 50)
  @Matches(/^[a-zA-Z' ]+$/)
  readonly name: string;

  @IsString()
  @Length(8, 32)
  readonly password: string;

  @IsEmail()
  @Length(4, 50)
  readonly email: string;
}
