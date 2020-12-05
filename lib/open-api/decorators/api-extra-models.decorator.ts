import { ApiExtraModels } from '@nestjs/swagger/dist/decorators/api-extra-models.decorator';

export function OpenApiExtraModels(...models: Function[]): MethodDecorator & ClassDecorator {
    return ApiExtraModels(...models);
}
