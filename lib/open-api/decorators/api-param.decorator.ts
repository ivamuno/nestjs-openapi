import { ApiParam, ApiParamOptions } from '@nestjs/swagger/dist/decorators/api-param.decorator';

export function OpenApiParam(options: ApiParamOptions): MethodDecorator {
    return ApiParam(options);
}
