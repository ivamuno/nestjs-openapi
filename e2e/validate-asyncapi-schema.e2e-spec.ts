import { NestFactory } from '@nestjs/core';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import * as SwaggerParser from 'swagger-parser';
import { ApplicationModule } from './src/app.module';
import { readFileSync } from 'fs';
import { join } from 'path';

import { AsyncApiDocumentBuilder, AsyncApiModule, AsyncAPIObject } from '../lib';

describe('Validate AsyncApi schema', () => {
  let document: AsyncAPIObject;

  beforeEach(async () => {
    const app = await NestFactory.create(ApplicationModule, {
      logger: false
    });
    app.setGlobalPrefix('api/');

    const options = new AsyncApiDocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .setBasePath('api')
      .addTag('cats')
      .build();

    document = AsyncApiModule.createDocument(app, options);
  });

  test('should produce a valid AsyncAPI 2.0 schema', async () => {
    try {
      expect(document.asyncapi).toStrictEqual('fail');
    } catch (err) {
      console.log('document', JSON.stringify(document));
      expect(err).toBeUndefined();
    }
  });
});
