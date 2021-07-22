import { ApiOperation, ApiOperationOptions } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ExamplesObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface OpenApiOperationOptionsExtra {
  examples: ExamplesObject;
}

export type OpenApiOperationOptions = ApiOperationOptions & Partial<OpenApiOperationOptionsExtra>;

export function OpenApiOperation(options: OpenApiOperationOptions): MethodDecorator {
  return ApiOperation(options);
}
