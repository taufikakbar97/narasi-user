import { Body, Controller, Delete, Get, Param, Post, Put, Req, ParseIntPipe } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/service/user.service';
import { User } from 'src/entity/User.entity';
import { CreateUserDto } from 'src/dto/CreateUser.dto';

@Controller('users')
export class UserController {

constructor(private userService: UserService) {}

@Post()
async create(@Body() createUserDTO: CreateUserDto) {
  const todo = await this.userService.create(createUserDTO);
  console.log(todo)
  if(!todo) {
    return 'error in creating user'
  }
  return 'user created successfully'
}

@Get()
async findAll(@Req() request: Request) {
  const users: Array<User> = await this.userService.findAll()
  return users
}

@Get('with-articles/:id')
async findOneWithArticles(@Param('id', ParseIntPipe) id: number) {
  const data = await this.userService.findUserByIdWithArticles(id)
  return data
}

@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  const user: User = await this.userService.findById(id)
  return user
}

@Put(':id')
async update(@Param('id') id: string, @Body() body: any) {
  const newUser: any = await this.userService.update(id, body)
  return "user updated";
}

@Delete(':id')
async remove(@Param('id') id: string) {
  await this.userService.delete(id)
  return "user deleted"
}

}