import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { UsersModule } from './users/users.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';

/* const getEnv = async () => {
  const response = await axios.get('/외부서버 비밀키 요청');
  return response.data;
}; */

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, WorkspacesModule, ChannelsModule, DmsModule],
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
