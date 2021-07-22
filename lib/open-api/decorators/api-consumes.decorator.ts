import { ApiConsumes } from '@nestjs/swagger/dist/decorators/api-consumes.decorator';

export function OpenApiConsumes(...mimeTypes: string[]): MethodDecorator & ClassDecorator {
  return ApiConsumes(...mimeTypes);
}
