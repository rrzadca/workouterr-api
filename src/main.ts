import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableCors({ origin: '*' });
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('WorkouteRR API')
        .setDescription('WorkouteRR REST API')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);

    fs.writeFileSync('./swagger-spec.json', JSON.stringify(document));

    SwaggerModule.setup('api/doc', app, document, {
        jsonDocumentUrl: 'api/doc.json',
    });

    await app.listen(3000);
}
bootstrap();
