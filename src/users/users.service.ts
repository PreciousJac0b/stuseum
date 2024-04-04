import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/auth/dtos/login.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  
  async createOrUpdate(user: User): Promise<Partial<User>> {
    const hash = await bcrypt.hash(user.getPassword(), 10);
    user.setPassword(hash);
    const newUser =  await this.usersRepository.save(user);

    const { password, ...userResult } = newUser;

    return userResult;

  }

  async login (email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({email: email});
    if (user) {
      const isMatch = await bcrypt.compare(password, user.getPassword());
      if (isMatch) {
        return user;
      }
    }
    return null;
  }

  async allUsers() {
    return this.usersRepository.find();
  }

  async findOne(loginDTO: Partial<User>): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email: loginDTO.email})

    if (!user) {
      throw new UnauthorizedException('Could not find user');
    }

    return user;
  }

  findUserById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

