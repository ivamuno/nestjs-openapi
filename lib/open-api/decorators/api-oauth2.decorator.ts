import { ApiOAuth2 } from '@nestjs/swagger/dist/decorators/api-oauth2.decorator';

export function OpenApiOAuth2(scopes: string[], name = 'oauth2') {
    return ApiOAuth2(scopes, name);
}
