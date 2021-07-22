import { INestApplication } from '@nestjs/common';
import { SwaggerDocumentOptions } from '@nestjs/swagger';

import { RedocOptions } from '../redoc/interfaces';
import { RedocModule } from '../redoc/redoc.module';

import { AsyncAPIObject } from '.';
import { AsyncapiScanner } from './asyncapi.scanner';

// tslint:disable-next-line: no-empty-interface
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

  public static setup(path: string, app: INestApplication, document: AsyncAPIObject, options?: RedocOptions): void {
    const defaultOptions = { docName: 'asyncapi', title: 'AsyncApi documentation' };
    RedocModule.setup(path, app, document, { ...defaultOptions, ...options });
  }
}
