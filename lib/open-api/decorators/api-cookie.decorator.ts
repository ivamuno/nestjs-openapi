import { ApiCookieAuth } from '@nestjs/swagger/dist/decorators/api-cookie.decorator';

export function OpenApiCookieAuth(name = 'cookie'): ClassDecorator & MethodDecorator {
  return ApiCookieAuth(name);
}
