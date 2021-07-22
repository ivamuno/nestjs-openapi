import { Type } from '@nestjs/common';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { AsyncOperationOptions, DECORATORS } from '..';
import { OperationObjectFactory } from '../services/operation-object.factory';

const operationObjectFactory = new OperationObjectFactory();

export const exploreAsyncapiOperationMetadata = (
    schemas: SchemaObject[],
    _schemaRefsStack: [],
    instance: object,
    prototype: Type<unknown>,
    method: object
) => {
    const pubMetadata: AsyncOperationOptions = exploreAsyncapiPubMetadata(instance, prototype, method);
    const subMetadata: AsyncOperationOptions = exploreAsyncapiSubMetadata(instance, prototype, method);

    let pubObject = {};
    if (pubMetadata) {
        pubObject = { pub: { ...pubMetadata, ...operationObjectFactory.create(pubMetadata, ['application/json'], schemas) } };
    }

    let subObject = {};
    if (subMetadata) {
        subObject = { sub: { ...subMetadata, ...operationObjectFactory.create(subMetadata, ['application/json'], schemas) } };
    }

    const result = { ...pubObject, ...subObject };
    return result;
};

export const exploreAsyncapiPubMetadata = (_instance: object, _prototype: Type<unknown>, method: object) => {
    const result = Reflect.getMetadata(DECORATORS.ASYNCAPI_PUB, method);
    return result;
};
export const exploreAsyncapiSubMetadata = (_instance: object, _prototype: Type<unknown>, method: object) => {
    const result = Reflect.getMetadata(DECORATORS.ASYNCAPI_SUB, method);
    return result;
};
