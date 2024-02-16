import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PlayersModule } from './players/players.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [UsersModule, PlayersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'first_nest',
    entities: [User],
    // autoLoadEntities: true,
    synchronize: true,
  }),
  ConfigModule.forRoot({
    isGlobal: true,
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
