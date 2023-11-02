import { Module } from '@nestjs/common';
import { UsersModule } from './crud/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'example',
            database: 'workouterr-db',
        }),
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
