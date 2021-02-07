import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './src/app.module';

import { AsyncApiDocumentBuilder, AsyncApiModule, AsyncAPIObject, AsyncServerObject } from '../lib';
import { readFileSync } from 'fs';
import { join } from 'path';
import { BritishShorthairCatDto, MaineCoonDto } from './src/cats/dto/bread-cat.dto';
import { CreateCatReplySuccessCommand, CreateCatReplyErrorCommand } from './src/cats/async/messages';

describe('Validate AsyncApi schema', () => {
  let document: AsyncAPIObject;

  beforeEach(async () => {
    const app = await NestFactory.create(ApplicationModule, {
      logger: false
    });
    app.setGlobalPrefix('api/');

    const server: AsyncServerObject = {
      url: 'server.p-url:{port}',
      protocol: 'amqp',
      protocolVersion: '0.9.1',
      description: 'Allows you to connect using the AMQP protocol to our RabbitMQ server.',
      security: [{ 'user-password': [] }],
      variables: {
        port: {
          description: 'Secure connection (TLS) is available through port 5672.',
          default: '5672',
          enum: ['5672']
        }
      },
      bindings: {
        'amqp': {}
      }
    };

    const options = new AsyncApiDocumentBuilder()
      .setTitle('Cats example')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addTag('cats')
      .setDefaultContentType('application/json')
      .addSecurity('user-password', { type: 'userPassword' })
      .addServer('cats-server', server)
      .build();

    const extraModels = [MaineCoonDto, BritishShorthairCatDto, CreateCatReplySuccessCommand, CreateCatReplyErrorCommand];
    document = AsyncApiModule.createDocument(app, options, { extraModels });
  });

  test('should produce a valid AsyncAPI 2.0 schema', async () => {
    const file: string = readFileSync(join(__dirname, 'async-api-spec.json'), 'utf8');
    const expectation = JSON.parse(file) as AsyncAPIObject;

    try {
      expect(document.asyncapi).toStrictEqual(expectation.asyncapi);
      expect(document.info).toStrictEqual(expectation.info);
      expect(document.tags).toStrictEqual(expectation.tags);
      expect(document.servers).toStrictEqual(expectation.servers);
      expect(document.components).toStrictEqual(expectation.components);
      expect(JSON.stringify(document.channels)).toStrictEqual(JSON.stringify(expectation.channels));
      expect(document.defaultContentType).toStrictEqual(expectation.defaultContentType);
      expect(document.externalDocs).toStrictEqual(expectation.externalDocs);
    } catch (err) {
      console.log(JSON.stringify(document));
      expect(err).toBeUndefined();
    }
  });
});
