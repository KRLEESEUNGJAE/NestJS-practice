import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

/* const getEnv = async () => {
  const response = await axios.get('/외부서버 비밀키 요청');
  return response.data;
}; */

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true /* load: [getEnv] */ })],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
