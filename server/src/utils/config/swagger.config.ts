import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setup(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('MSG api')
    .setDescription('MSG api description')
    .setVersion('0.0.1')
    .addServer('http://localhost:8080/', 'Local environment')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'MSG api',
  });

  return app;
}
