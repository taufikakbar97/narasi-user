import { Body, Injectable, CacheInterceptor, UseInterceptors, CacheTTL, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/CreateUser.dto';
import { User } from 'src/entity/User.entity';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { map, catchError } from 'rxjs';

@Injectable()
export class UserService {

ARTICLE_SERVICE_URL: string = 'http://localhost:4001';

constructor(
  @InjectRepository(User) private userRepository: Repository<User>,
  private http: HttpService,
) {}

create(createUserDTO: CreateUserDto): Promise<User> {
    return this.userRepository.save(this.userRepository.create(createUserDTO));
}

@UseInterceptors(CacheInterceptor)
@CacheTTL(10)
findById (id: number): Promise<User> {
  return this.userRepository.findOne({
    where: {
      id: id
    }
  })
}

@UseInterceptors(CacheInterceptor)
@CacheTTL(10)
findAll(): Promise<User[]> {
  return this.userRepository.find();
}

update(id: string, data: any): Promise<any> {
  return this.userRepository
  .createQueryBuilder()
  .update()
  .set({
    username: data.username,
    password: data.password
  })
  .where('id = :id', { id })
  .execute()
}

delete(id: string): Promise<any> {
  return this.userRepository
  .createQueryBuilder()
  .delete()
  .from(User)
  .where('id = :id', { id })
  .execute()
}

@UseInterceptors(CacheInterceptor)
@CacheTTL(10)
async findUserByIdWithArticles (id: number) {
  let user = await this.userRepository.findOne({where: {id: id}});
  if (user == null) {
    return 'users not found'
  }
  return this.getArticleByUserIdAndBindToUser(id, user)
}

async getArticleByUserIdAndBindToUser(userId: number, user: User) {
  return this.http
    .get(this.ARTICLE_SERVICE_URL + '/articles/user/' + userId)
    .pipe(
      map((res) => {
        console.log('pepek')
          console.log(res)
          return {
            'user': user,
            'articles': res.data
          };
      }),
    )
    .pipe(
      catchError((e) => {
        throw new ForbiddenException(e);
      }),
    );
}

}