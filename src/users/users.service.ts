import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'
import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { isValidObjectId } from 'mongoose'

@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private userModel: Model<User>) {}
  handleHashPassword = (password: string) => {
    const salt = genSaltSync(10)
    const hash = hashSync(password, salt)
    return hash
  }

  async create (createUserDto: CreateUserDto) {
    const hashPassword = this.handleHashPassword(createUserDto.password)
    const user = await this.userModel.create({
      email: createUserDto.email,
      password: hashPassword,
      username: createUserDto.username,
    })
    return user
  }

  findAll () {
    return `This action returns all users`
  }

  findOne (id: string) {
    const isIDValid = isValidObjectId(id)

    if (!isIDValid) return 'not found user'
    return this.userModel.findOne({ _id: id })
  }
  findOneByEmail (email: string) {
    return this.userModel.findOne({ email: email })
  }

  checkUserPassword(password: string, hash: string) {
    const isValidPassword = compareSync(password, hash); // false
    return isValidPassword
  }

  async update (updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(
      { _id: updateUserDto._id },
      { ...updateUserDto },
    )
  }

  async remove (id: string) {
    return await this.userModel.deleteOne({ _id: id })
  }
}
