import { NestFactory } from '@nestjs/core';
import { AsyncApiDocumentBuilder, AsyncApiModule, AsyncServerObject, OpenApiDocumentBuilder, OpenApiModule } from '@ivamuno/nestjs-openapi';
import { AppModule } from './app.module';
import { BritishShorthairCatDto, MaineCoonDto } from './cats/dto/bread-cat.dto';
import { CreateCatReplyErrorCommand, CreateCatReplySuccessCommand } from './cats/async/messages';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const extraModels = [MaineCoonDto, BritishShorthairCatDto];

  const opeanApiOptions = new OpenApiDocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .setBasePath('api')
    .addTag('cats', 'Everything about your cats.')
    .addBasicAuth()
    .addBearerAuth()
    .addOAuth2()
    .addApiKey()
    .addCookieAuth()
    .addSecurityRequirements('bearer')
    .build();

  const openApidocument = OpenApiModule.createDocument(app, opeanApiOptions, { extraModels });
  OpenApiModule.setup('openapi', app, openApidocument, {});

  const asyncApiServer: AsyncServerObject = {
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

  const asyncApiOptions = new AsyncApiDocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .setDefaultContentType('application/json')
    .addSecurity('user-password', { type: 'userPassword' })
    .addServer('cats-server', asyncApiServer)
    .build();

  const asynApiExtraModels = [CreateCatReplySuccessCommand, CreateCatReplyErrorCommand];
  const asyncApiDocument = AsyncApiModule.createDocument(app, asyncApiOptions, { extraModels: [...extraModels, ...asynApiExtraModels] });
  AsyncApiModule.setup('asyncapi', app, asyncApiDocument);

  await app.listen(3000);
}
bootstrap();
