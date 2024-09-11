import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from 'src/auth/dtos/login.dto';
import { Book } from 'src/models/book.entity';

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

  async allUsers(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['books'] });
  }

  async findOne(loginDTO: LoginDTO): Promise<User> {
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

  async followUser (followerId: number, followingId: number): Promise<void> {
    const follower = await this.usersRepository.findOne({ where: { id: followerId }, relations: ['following']});

    const following = await this.usersRepository.findOne({ where: { id: followingId } });

    if (!follower || !following) {
      throw new NotFoundException('User not found');
    }

    follower.following.push(following);
    await this.usersRepository.save(follower);
  }

  async unfollowUser (followerId: number,followingId: number): Promise<void> {
    const follower = await this.usersRepository.findOne({ where: { id: followerId }, relations: ['following'] });

    if (!follower) {
      throw new NotFoundException();
    }

    // Check if nestjs has a remove method for repositories many-to-many relations
    follower.following = follower.following.filter(user => user.id !== followingId);
    await this.usersRepository.save(follower);
  }

  async getFollowers (userId: number): Promise<User[]> {
    const user = await this.usersRepository.findOne({where: { id: userId }, relations: ['followers']});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.followers;
  }

  async getFollowing (userId: number): Promise<User[]> {
    const user = await this.usersRepository.findOne({where: { id: userId }, relations: ['following']});

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.following;
  }
}

