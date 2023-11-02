import { User } from '../src/users/entities/user.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';
import { Exercise } from '../src/exercises/entities/exercise.entity';
import { Plan } from '../src/plans/entities/plan.entity';
import { PlansGroup } from '../src/plans-groups/entities/plans-group.entity';

export default registerAs(
    'orm.config',
    (): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Exercise, Plan, PlansGroup],
        synchronize: true,
    }),
);
