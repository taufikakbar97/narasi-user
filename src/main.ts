import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserModule } from 'src/module/user.module';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.listen(5000)
  .then(() => {
    console.log("user-service successfully stared on port 5000");
  })
  .catch((error) => {
    console.log(error);
  })}
bootstrap();
