import { Module } from '@nestjs/common';
import {UsersModule} from "./crud/users/users.module";

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
