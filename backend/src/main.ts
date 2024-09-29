import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // allow cross-origin requests (should be properly configured/disabled in production)

  // for production app, we should use helmet/csurf

  // enable validation for all routes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
