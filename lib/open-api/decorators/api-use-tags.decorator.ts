import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

export function OpenApiTags(...tags: string[]): MethodDecorator & ClassDecorator {
    return ApiTags(...tags);
}
