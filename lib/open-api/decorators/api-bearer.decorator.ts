import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';

export function OpenApiBearerAuth(name = 'bearer'): ClassDecorator & MethodDecorator {
    return ApiBearerAuth(name);
}
