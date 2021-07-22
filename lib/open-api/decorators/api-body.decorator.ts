import { ApiBody, ApiBodyOptions } from '@nestjs/swagger/dist/decorators/api-body.decorator';

export function OpenApiBody(options: ApiBodyOptions): MethodDecorator {
  return ApiBody(options);
}
