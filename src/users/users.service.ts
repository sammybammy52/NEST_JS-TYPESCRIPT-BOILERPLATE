import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ModifiedRequestDto } from './dto/mod-request.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) {

    const hash = await bcrypt.hash(createUserDto.password, 12);

    const userObj:CreateUserDto = {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: hash
    }

    const user = await this.usersRepository.save(userObj);

    return {
      status: 'success',
      user: user
    };
  }

  async login (loginUserDto: LoginUserDto) {

    // console.log(process.env.JWT_SECRET_KEY);

    const password: string = loginUserDto.password;

    const user = await this.usersRepository.findOneBy({ email: loginUserDto.email });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials');
    }
    const jwt = await this.jwtService.signAsync({ ...user}, { secret: process.env.JWT_SECRET_KEY });

    return {
      status: 'success',
      user: user,
      token: jwt
    }
  }

  async userInfo(user: User) {
    const userInfo = await this.usersRepository.findOneBy({ id: user.id});
    return {
      status: 'success',
      user: userInfo,
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
