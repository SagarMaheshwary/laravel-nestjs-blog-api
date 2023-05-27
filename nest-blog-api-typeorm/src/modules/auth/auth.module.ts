import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UniqueDatabase } from 'src/validators/unique-database';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get('jwt.secret'),
        signOptions: {
          expiresIn: configService.get('jwt.expiry'),
          algorithm: configService.get('jwt.algorithm'),
        },
      }),
    }),
    UserModule,
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UniqueDatabase],
})
export class AuthModule {}
