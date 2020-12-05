import { ApiProduces } from '@nestjs/swagger/dist/decorators/api-produces.decorator';

export function OpenApiProduces(...mimeTypes: string[]): MethodDecorator & ClassDecorator {
    return ApiProduces(...mimeTypes);
}
