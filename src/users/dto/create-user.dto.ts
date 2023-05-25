import { IsEmail, IsNotEmpty } from 'class-validator'

//data transfer object
export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Email khong dung dinh dang',
    },
  )
  @IsNotEmpty({
    message: 'Email khong duoc de trong',
  })
  email: string

  @IsNotEmpty()
  password: string

  username: string
  address: string
}
