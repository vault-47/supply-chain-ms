import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const message = errors
          .map((err) => {
            if (err.constraints) {
              return Object.values(err.constraints).join(', ');
            }
            return '';
          })
          .join(', ');
        return new BadRequestException(message);
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Supply chain API')
    .setDescription('This is API for supply chain management system')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'bearer',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap()
  .then((r) => r)
  .catch((e) => {
    console.log(e);
  });
