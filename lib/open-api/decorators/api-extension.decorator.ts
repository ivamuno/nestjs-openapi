import { ApiExtension } from '@nestjs/swagger/dist/decorators/api-extension.decorator';

export function OpenApiExtension(extensionKey: string, extensionProperties: any): MethodDecorator & ClassDecorator {
  return ApiExtension(extensionKey, extensionProperties);
}
