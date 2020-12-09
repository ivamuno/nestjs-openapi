import { INestApplication } from '@nestjs/common';
import { loadPackage } from '@nestjs/common/utils/load-package.util';
import { SwaggerDocumentOptions } from '@nestjs/swagger';
import { validatePath } from '@nestjs/swagger/dist/utils/validate-path.util';

import { AsyncAPIObject } from '.';
import { AsyncapiScanner } from './asyncapi.scanner';

export interface AsyncApiDocumentOptions extends SwaggerDocumentOptions {}

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

    public static setup(path: string, app: INestApplication, document: AsyncAPIObject, options?: AsyncApiDocumentOptions) {
        return this.setupExpress(path, app, document, options);
    }

    private static setupExpress(path: string, app: INestApplication, document: AsyncAPIObject, options?: AsyncApiDocumentOptions) {
        const httpAdapter = app.getHttpAdapter();
        const finalPath = validatePath(path);
        const swaggerUi = loadPackage('swagger-ui-express', 'AsyncApiModule', () => require('swagger-ui-express'));
        const swaggerHtml = swaggerUi.generateHTML(document, options);
        app.use(finalPath, swaggerUi.serveFiles(document, options));

        httpAdapter.get(finalPath, (req, res) => res.send(swaggerHtml));
        httpAdapter.get(finalPath + '-json', (req, res) => res.json(document));
    }
}
