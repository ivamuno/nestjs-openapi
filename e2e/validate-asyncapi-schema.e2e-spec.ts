import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './src/app.module';

import { AsyncApiDocumentBuilder, AsyncApiModule, AsyncAPIObject, AsyncServerObject } from '../lib';

describe('Validate AsyncApi schema', () => {
  let document: AsyncAPIObject;

  beforeEach(async () => {
    const app = await NestFactory.create(ApplicationModule, {
      logger: false
    });
    app.setGlobalPrefix('api/');

    const server: AsyncServerObject = {
      url: 'itg-p-mq.adam.payvision:{port}',
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
      .addServer('testing', Object.assign(server, { url: 'itg-t-mq.adam.payvision:{port}' }))
      .addServer('acceptance', Object.assign(server, { url: 'itg-a-mq.adam.payvision:{port}' }))
      .addServer('production', server)
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
