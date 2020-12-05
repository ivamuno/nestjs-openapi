import { ApiSecurity } from '@nestjs/swagger/dist/decorators/api-security.decorator';

export function OpenApiSecurity(name: string, requirements: string[] = []): ClassDecorator & MethodDecorator {
    return ApiSecurity(name, requirements);
}
