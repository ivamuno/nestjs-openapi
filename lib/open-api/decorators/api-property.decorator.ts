import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions, ApiResponseProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export function OpenApiProperty(options?: ApiPropertyOptions): PropertyDecorator {
    return ApiProperty(options);
}

export function OpenApiPropertyOptional(options?: ApiPropertyOptions): PropertyDecorator {
    return ApiPropertyOptional(options);
}

export function OpenApiResponseProperty(
    options?: Pick<ApiPropertyOptions, 'type' | 'example' | 'format' | 'enum' | 'deprecated'>
): PropertyDecorator {
    return ApiResponseProperty(options);
}
