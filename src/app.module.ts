import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import ormConfig from '../config/orm.config';
import ormConfigProd from '../config/orm.config.prod';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [ormConfig],
        }),
        TypeOrmModule.forRootAsync({
            useFactory:
                process.env.NODE_ENV !== 'production'
                    ? ormConfig
                    : ormConfigProd,
        }),
        UsersModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
