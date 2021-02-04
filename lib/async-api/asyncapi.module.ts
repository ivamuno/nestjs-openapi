import { INestApplication } from '@nestjs/common';
import { SwaggerDocumentOptions } from '@nestjs/swagger';

import { AsyncAPIObject } from '.';
import { RedocOptions } from '../redoc/interfaces';
import { RedocModule } from '../redoc/redoc-module';
import { AsyncapiScanner } from './asyncapi.scanner';

export interface AsyncApiDocumentOptions extends SwaggerDocumentOptions { }

export class AsyncApiModule {
    public static createDocument(
        app: INestApplication,
        config: Omit<AsyncAPIObject, 'channels'>,
        options: AsyncApiDocumentOptions = {}
    ): AsyncAPIObject {
        const swaggerScanner = new AsyncapiScanner();
        const document = swaggerScanner.scanApplication(app, options);
        document.components = {
            ...(config.components || {}),
            ...document.components,
        };
        return {
            asyncapi: '2.0.0',
            ...config,
            ...document,
        };
    }

    public static setup(path: string, app: INestApplication, document: AsyncAPIObject, options?: RedocOptions): void {
        RedocModule.setup(path, app, document, options);
    }
}
