import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from 'ormconfig';
import { ChannelChats } from './entities/ChannelChats';
import { ChannelMembers } from './entities/ChannelMembers';
import { Channels } from './entities/Channels';
import { DMs } from './entities/DMs';
import { Mentions } from './entities/Mentions';
import { Users } from './entities/Users';
import { WorkspaceMembers } from './entities/WorkspaceMembers';
import { Workspaces } from './entities/Workspaces';

/* const getEnv = async () => {
  const response = await axios.get('/외부서버 비밀키 요청');
  return response.data;
}; */

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    WorkspacesModule,
    ChannelsModule,
    DmsModule,
    TypeOrmModule.forRoot(ormconfig),

    //? ormconfig로 분리하지 않고 app.module에 직접 typeORM 작성하는 법
    /*     TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [
            ChannelChats,
            ChannelMembers,
            Channels,
            DMs,
            Mentions,
            Users,
            WorkspaceMembers,
            Workspaces,
          ],
          migrations: [__dirname + '/src/migrations/*.ts'],
          cli: { migrationsDir: 'src/migrations' },
          autoLoadEntities: true,
          charset: 'utf8mb4',
          synchronize: false,
          logging: true,
          keepConnectionAlive: true,
        };
      },
    }), */
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    // {
    //   provide: 'CUSTOM_KEY',
    //   useValue: 'CUSTOM_VALUE',
    // },
  ],

  //? providers 원형
  // providers: [
  //   {
  //     provide: AppService, //고유한 키
  //     useClass: AppService,
  //     useValue: 123,
  //     useFactory: () => {
  //       return {
  //         a: 'b',
  //       };
  //     },
  //   },
  // ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
