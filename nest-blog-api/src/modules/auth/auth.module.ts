import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UniqueDatabaseField } from 'src/validators/unique-database-field';

@Module({
  providers: [
    AuthService,
    UniqueDatabaseField, //Adding UniqueDatabaseField in providers so we nest can inject sequelize
  ],
  controllers: [AuthController],
  imports: [
    UserModule,
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
  ],
})
export class AuthModule {}
