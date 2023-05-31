import { Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor (private usersService: UsersService) {}
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
}
