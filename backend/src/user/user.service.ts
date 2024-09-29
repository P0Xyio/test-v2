import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from './dto/login';

import * as bcrypt from 'bcrypt';

// it could be merged into one regex, but this way it's easier to understand
const passwordChecks: RegExp[] = [/[a-z]/, /[A-Z]/, /\d/, /^\S+$/]; // lowercase, uppercase, digit, no whitespace

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  /**
   * Finds user with given id
   * @param id - user Id to search for
   * @returns user or null if not found
   */
  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id: id });
  }

  /**
   * Finds user with given email
   * @param email - user email to search for
   * @returns user or null if not found
   */
  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email: email });
  }

  /**
   * Handles user creation
   * @param registerDto
   * @returns JWT token or throws exception
   */
  async register(registerDto: RegisterDto) {
    const password = registerDto.password;

    // check if password meets requirements
    const isInvalid = passwordChecks.some((regexp) => !regexp.test(password));
    if (isInvalid == true) {
      throw new BadRequestException(
        'Please check your password is at least 8 characters long, contains at least one lowercase letter, one uppercase letter, one digit, and no whitespaces',
      );
    }

    // check if user with given email already exists, so we can send more user-friendly error message
    const userExists = await this.findByEmail(registerDto.email);
    if (userExists) {
      throw new ConflictException('Account with given email already exists');
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = new User();
    user.name = registerDto.name;
    user.email = registerDto.email;
    user.password = passwordHash;

    // save user to database
    try {
      const createdUser = await this.usersRepository.save(user);
      return this.authService.login(createdUser); // send back token
    } catch (err) {
      console.error(err);
      throw new ConflictException('Oops, something went wrong');
    }
  }

  /**
   * Handles user login
   * @param loginDto
   * @returns JWT token or throws exception
   */
  async login(dto: LoginDto) {
    // check is user exists
    const user = await this.usersRepository.findOneBy({
      email: dto.email,
    });

    if (!user) {
      throw new UnauthorizedException(
        'You have entered an invalid email or password',
      );
    }

    // compare password
    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (isMatch === false) {
      throw new UnauthorizedException(
        'You have entered an invalid email or password',
      );
    }

    // send JWT token
    return this.authService.login(user);
  }
}
