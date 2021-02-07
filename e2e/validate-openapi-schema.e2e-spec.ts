import { NestFactory } from '@nestjs/core';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import * as SwaggerParser from 'swagger-parser';
import { ApplicationModule } from './src/app.module';
import { readFileSync } from 'fs';
import { join } from 'path';

import { OpenApiDocumentBuilder, OpenApiModule } from '../lib';
import { BritishShorthairCatDto, MaineCoonDto } from './src/cats/dto/bread-cat.dto';

describe('Validate OpenAPI schema', () => {
  let document: OpenAPIObject;

  beforeEach(async () => {
    const app = await NestFactory.create(ApplicationModule, {
      logger: false
    });
    app.setGlobalPrefix('api/');

    const options = new OpenApiDocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .setBasePath('api')
      .addTag('cats')
      .addBasicAuth()
      .addBearerAuth()
      .addOAuth2()
      .addApiKey()
      .addCookieAuth()
      .addSecurityRequirements('bearer')
      .build();

    const extraModels = [MaineCoonDto, BritishShorthairCatDto];
    document = OpenApiModule.createDocument(app, options, { extraModels });
  });

  test('should produce a valid OpenAPI 3.0 schema', async () => {
    const file: string = readFileSync(join(__dirname, 'open-api-spec.json'), 'utf8');
    const expectation = JSON.parse(file) as OpenAPIObject;

    try {
      await SwaggerParser.validate(document as any);
      expect(document.openapi).toStrictEqual(expectation.openapi);
      expect(document.info).toStrictEqual(expectation.info);
      expect(document.tags).toStrictEqual(expectation.tags);
      expect(document.servers).toStrictEqual(expectation.servers);
      expect(document.components).toStrictEqual(expectation.components);
      expect(document.security).toStrictEqual(expectation.security);
      expect(document.paths).toStrictEqual(expectation.paths);
    } catch (err) {
      console.log(JSON.stringify(document));
      expect(err).toBeUndefined();
    }
  });
});
