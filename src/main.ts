import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './user-managment/roles.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new RolesGuard(reflector, app.get(JwtService)));

  // Enable WebSockets with the IoAdapter


  // Listen on port 3002 for WebSocket server
  await app.listen(3000);
}
bootstrap();