import { Users } from './../entities/Users';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}
  async join(email: string, nickname: string, password: string) {
    if (!email) {
      // email 없음 error
      throw new Error('이메일이 존재하지 않습니다');
    }
    if (!nickname) {
      // nickname 없음 error
      throw new Error('닉네임이 존재하지 않습니다');
    }
    if (!password) {
      // password 없음 error
      throw new Error('비밀번호가 존재하지 않습니다');
    }
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      // 이미 존재하는 유저 error
      throw new Error('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });
  }
}
