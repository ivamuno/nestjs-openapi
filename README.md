# nestjs-openapi

## Demo

Available running

```bash
npm start:demo
```

It start a Nest application exposing:
- OpenAPI example under http://localhost:3000/openapi
- AsyncAPI example under http://localhost:3000/asyncapi

## Features
- Extended OpenAPI decorators to allow examples.
- New AsyncAPI decoratores: AsyncApiChannel, AsyncApiSub, AsyncApiPub.
- Support examples and discrimators for AsyncAPI as OpenAPI does (it means, the decoratos are not 100% compatible with AsyncAPI spec).
- Redoc integration for OpenAPI and AsyncAPI.
- AMQP and Kafka are support only for AsyncAPI.

## Roadmap
- Header and Traits support.
- Support more protocols for AsyncAPI.
- Try-it-out support and postman generation with Redoc.
