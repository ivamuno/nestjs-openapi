import { Type } from '@nestjs/common';
import { AsyncOperationObject, ExampleObject } from '..';
import { createMixedDecorator } from '@nestjs/swagger/dist/decorators/helpers';
import { DECORATORS } from './constants';

export interface AsyncOperationOptions extends Omit<AsyncOperationObject, 'message'> {
    message: {
        name: string;
        type: Type<unknown> | Function | [Function] | string;
        examples?: Record<string, ExampleObject>;
    };
}

export function AsyncApiPub(options: AsyncOperationOptions): MethodDecorator & ClassDecorator {
    const result = createMixedDecorator(DECORATORS.ASYNCAPI_PUB, options);
    return result;
}

export function AsyncApiSub(options: AsyncOperationOptions): MethodDecorator & ClassDecorator {
    const result = createMixedDecorator(DECORATORS.ASYNCAPI_SUB, options);
    return result;
}
