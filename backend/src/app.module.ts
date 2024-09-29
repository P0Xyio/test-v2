import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration, { Configuration } from './config/configuration';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Configuration>) => ({
        type: 'postgres',
        host: configService.get('dbConnection.host', { infer: true }),
        port: configService.get('dbConnection.port', { infer: true }),
        username: configService.get('dbConnection.user', { infer: true }),
        password: configService.get('dbConnection.password', { infer: true }),
        database: configService.get('dbConnection.database', { infer: true }),
        autoLoadEntities: true,
        synchronize: true, // shouldn't be true in production
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
