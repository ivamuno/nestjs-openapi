import { ApiBasicAuth } from '@nestjs/swagger/dist/decorators/api-basic.decorator';

export function OpenApiBasicAuth(name = 'basic'): ClassDecorator & MethodDecorator {
  return ApiBasicAuth(name);
}
