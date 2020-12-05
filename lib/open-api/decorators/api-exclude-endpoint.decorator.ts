import { ApiExcludeEndpoint } from '@nestjs/swagger/dist/decorators/api-exclude-endpoint.decorator';

export function OpenApiExcludeEndpoint(disable = true): MethodDecorator {
    return ApiExcludeEndpoint(disable);
}
