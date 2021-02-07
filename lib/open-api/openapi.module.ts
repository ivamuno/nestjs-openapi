import { INestApplication } from '@nestjs/common';
import { OpenAPIObject, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { ContentObject, OperationObject, PathItemObject, RequestBodyObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { RedocOptions } from '../redoc/interfaces';
import { RedocModule } from '../redoc/redoc.module';

export class OpenApiModule {
    public static createDocument(app: INestApplication, config: Omit<OpenAPIObject, 'paths'>, options?: SwaggerDocumentOptions): OpenAPIObject {
        var document = SwaggerModule.createDocument(app, config, options);
        Object.keys(document.paths).forEach(pathKey => {
            let path: PathItemObject = document.paths[pathKey];
            Object.keys(path).forEach(operationKey => {
                let operationMetadata = path[operationKey] as any;
                let operation = operationMetadata as OperationObject;
                if (operation) {
                    OpenApiModule.mapRequestBodyExamples(operationMetadata, operation);
                    OpenApiModule.mapResponseExamples(operation);
                }
            });
        });
        return document;
    }

    public static setup(path: string, app: INestApplication, document: OpenAPIObject, options?: RedocOptions): void {
        const defaultOptions = { docName: 'openapi', title: 'OpenApi documentation' };
        RedocModule.setup(path, app, document, { ...defaultOptions, ...options });
    }

    private static mapExamples(metadata: any, target: any) {
        let requestBodyExamples = metadata.examples;
        if (requestBodyExamples) {
            Object.keys(target.content).forEach(contentTypeKey => {
                let contentType = target.content[contentTypeKey] as ContentObject;
                contentType.examples = requestBodyExamples;
            });

            delete metadata.examples;
        }
    }

    private static mapRequestBodyExamples(operationMetadata: any, operation: OperationObject): void {
        let requestBody = operation.requestBody as RequestBodyObject;
        if (requestBody) {
            OpenApiModule.mapExamples(operationMetadata, requestBody);
        }
    }

    private static mapResponseExamples(operation: OperationObject): void {
        Object.keys(operation.responses).forEach(responseKey => {
            let response = operation.responses[responseKey] as any;
            OpenApiModule.mapExamples(response, response);
        });
    }
}
