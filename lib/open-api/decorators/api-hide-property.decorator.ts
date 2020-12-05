import { ApiHideProperty } from '@nestjs/swagger/dist/decorators/api-hide-property.decorator';

export function OpenApiHideProperty(): PropertyDecorator {
    return ApiHideProperty();
}
