import { User } from '../src/users/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { Plan } from '../src/plans/entities/plan.entity';
import { Exercise } from '../src/exercises/entities/exercise.entity';

export default registerAs(
    'orm.config.prod',
    (): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Exercise, Plan],
        synchronize: false,
    }),
);
