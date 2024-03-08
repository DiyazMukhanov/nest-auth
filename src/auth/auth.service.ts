import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

const fakeUsers = [
  {
    id: 1,
    username: 'anson',
    password: 'pass1234',
    role: 'user',
    permissions: [],
  },
  {
    id: 2,
    username: 'anton',
    password: 'pass1',
    role: 'admin',
    permissions: ['read: cats'],
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUser({ username, password }) {
    const foundUser = fakeUsers.find((user) => user.username === username);

    if (!foundUser) {
      return null;
    }

    if (password === foundUser.password) {
      const { password, ...user } = foundUser;
      return this.jwtService.sign(user);
    }
  }
}
