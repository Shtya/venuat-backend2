import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { LoggingValidationPipe } from 'common/translationPipe';
import { ConfigService } from '@nestjs/config';
import { QueryFailedErrorFilter } from 'common/filters/QueryFailedErrorFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3030;
  // Get the ConfigService instance
  const configService = app.get(ConfigService);

  
  app.useGlobalFilters(app.get(QueryFailedErrorFilter));
  app.useStaticAssets(join(__dirname, '..', '..', '/uploads'), { prefix: '/uploads/' });

  app.enableCors({
    origin: configService.get('ALLOWED_ORIGINS')?.split(',') || '*', // Allow specific origins or all
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization,x-lang',
    exposedHeaders: 'Content-Length,Content-Range',
  });

  app.setGlobalPrefix('api/v1');

  const loggingValidationPipe = app.get(LoggingValidationPipe);
  app.useGlobalPipes(loggingValidationPipe);

  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false }));

  Logger.log(`🚀 server is running on port ${port}`);

  await app.listen(port);
}
bootstrap();
