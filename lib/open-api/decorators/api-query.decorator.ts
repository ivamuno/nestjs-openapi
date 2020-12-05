import { ApiQuery, ApiQueryOptions } from '@nestjs/swagger/dist/decorators/api-query.decorator';

export function OpenApiQuery(options: ApiQueryOptions): MethodDecorator {
    return ApiQuery(options);
}
