import { Module } from '@nestjs/common';
import { TodoModule } from './todos/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TodoModule,
    UserModule​​,
  ],
})
export class AppModule {}
