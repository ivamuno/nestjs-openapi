import {
  ApiAcceptedResponse,
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiForbiddenResponse,
  ApiFoundResponse,
  ApiGatewayTimeoutResponse,
  ApiGoneResponse,
  ApiInternalServerErrorResponse,
  ApiMethodNotAllowedResponse,
  ApiMovedPermanentlyResponse,
  ApiNoContentResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiNotImplementedResponse,
  ApiOkResponse,
  ApiPayloadTooLargeResponse,
  ApiPreconditionFailedResponse,
  ApiRequestTimeoutResponse,
  ApiResponse,
  ApiResponseOptions,
  ApiServiceUnavailableResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
  ApiUnsupportedMediaTypeResponse,
} from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { ExamplesObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export interface ApiResponseOptionsExtra {
  examples: ExamplesObject;
}

export type OpenApiResponseOptions = ApiResponseOptions & Partial<ApiResponseOptionsExtra>;

export function OpenApiResponse(options: OpenApiResponseOptions): MethodDecorator & ClassDecorator {
  return ApiResponse(options);
}

export const OpenApiOkResponse = (options: OpenApiResponseOptions = {}) => ApiOkResponse(options);

export const OpenApiCreatedResponse = (options: OpenApiResponseOptions = {}) => ApiCreatedResponse(options);

export const OpenApiAcceptedResponse = (options: OpenApiResponseOptions = {}) => ApiAcceptedResponse(options);

export const OpenApiNoContentResponse = (options: OpenApiResponseOptions = {}) => ApiNoContentResponse(options);

export const OpenApiMovedPermanentlyResponse = (options: OpenApiResponseOptions = {}) => ApiMovedPermanentlyResponse(options);

export const OpenApiFoundResponse = (options: OpenApiResponseOptions = {}) => ApiFoundResponse(options);

export const OpenApiBadRequestResponse = (options: OpenApiResponseOptions = {}) => ApiBadRequestResponse(options);

export const OpenApiUnauthorizedResponse = (options: OpenApiResponseOptions = {}) => ApiUnauthorizedResponse(options);

export const OpenApiTooManyRequestsResponse = (options: OpenApiResponseOptions = {}) => ApiTooManyRequestsResponse(options);

export const OpenApiNotFoundResponse = (options: OpenApiResponseOptions = {}) => ApiNotFoundResponse(options);

export const OpenApiInternalServerErrorResponse = (options: OpenApiResponseOptions = {}) => ApiInternalServerErrorResponse(options);

export const OpenApiBadGatewayResponse = (options: OpenApiResponseOptions = {}) => ApiBadGatewayResponse(options);

export const OpenApiConflictResponse = (options: OpenApiResponseOptions = {}) => ApiConflictResponse(options);

export const OpenApiForbiddenResponse = (options: OpenApiResponseOptions = {}) => ApiForbiddenResponse(options);

export const OpenApiGatewayTimeoutResponse = (options: OpenApiResponseOptions = {}) => ApiGatewayTimeoutResponse(options);

export const OpenApiGoneResponse = (options: OpenApiResponseOptions = {}) => ApiGoneResponse(options);

export const OpenApiMethodNotAllowedResponse = (options: OpenApiResponseOptions = {}) => ApiMethodNotAllowedResponse(options);

export const OpenApiNotAcceptableResponse = (options: OpenApiResponseOptions = {}) => ApiNotAcceptableResponse(options);

export const OpenApiNotImplementedResponse = (options: OpenApiResponseOptions = {}) => ApiNotImplementedResponse(options);

export const OpenApiPreconditionFailedResponse = (options: OpenApiResponseOptions = {}) => ApiPreconditionFailedResponse(options);

export const OpenApiPayloadTooLargeResponse = (options: OpenApiResponseOptions = {}) => ApiPayloadTooLargeResponse(options);

export const OpenApiRequestTimeoutResponse = (options: OpenApiResponseOptions = {}) => ApiRequestTimeoutResponse(options);

export const OpenApiServiceUnavailableResponse = (options: OpenApiResponseOptions = {}) => ApiServiceUnavailableResponse(options);

export const OpenApiUnprocessableEntityResponse = (options: OpenApiResponseOptions = {}) => ApiUnprocessableEntityResponse(options);

export const OpenApiUnsupportedMediaTypeResponse = (options: OpenApiResponseOptions = {}) => ApiUnsupportedMediaTypeResponse(options);

export const OpenApiDefaultResponse = (options: OpenApiResponseOptions = {}) => ApiDefaultResponse(options);
