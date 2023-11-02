import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ExercisesModule } from './exercises/exercises.module';
import { PlansModule } from './plans/plans.module';
import { PlansGroupsModule } from './plans-groups/plans-groups.module';
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
        ExercisesModule,
        PlansModule,
        PlansGroupsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
