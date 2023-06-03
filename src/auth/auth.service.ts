import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor (private usersService: UsersService, private jwtService: JwtService) {}
  async validateUser (email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email)
    if (user) {
      const isValidPassword = this.usersService.checkUserPassword(
        pass,
        user.password,
      )
      if (isValidPassword === true) {
        return user
      }
    }
    return null
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }
}
