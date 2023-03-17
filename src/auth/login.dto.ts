import { IsEmail, Length } from 'class-validator';


export class LoginDTO {
  @IsEmail()
  email: string;

  @Length(8, 50)
  password: string;
}
