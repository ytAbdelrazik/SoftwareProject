import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './user-managment/roles.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector, app.get(JwtService)));

  await app.listen(3000);
}
bootstrap();
