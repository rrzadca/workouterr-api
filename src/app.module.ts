import { Module } from '@nestjs/common';
import { UsersModule } from './crud/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './crud/users/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: '127.0.0.1',
            port: 3306,
            username: 'root',
            password: 'example',
            database: 'workouterr_db',
            entities: [User],
            synchronize: true,
        }),
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
