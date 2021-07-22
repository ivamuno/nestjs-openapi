import { ApiHeader, ApiHeaderOptions, ApiHeaders } from '@nestjs/swagger/dist/decorators/api-header.decorator';

export function OpenApiHeader(options: ApiHeaderOptions): MethodDecorator & ClassDecorator {
  return ApiHeader(options);
}

export const OpenApiHeaders = (headers: ApiHeaderOptions[]): MethodDecorator & ClassDecorator => {
  return ApiHeaders(headers);
};
