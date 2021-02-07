import { AsyncOperationOptions } from '../decorators';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ModelPropertiesAccessor } from '@nestjs/swagger/dist/services/model-properties-accessor';
import { SchemaObjectFactory } from '@nestjs/swagger/dist/services/schema-object-factory';
import { SwaggerTypesMapper } from '@nestjs/swagger/dist/services/swagger-types-mapper';
import { getSchemaPath } from '@nestjs/swagger/dist/utils';
import { AsyncOperationObject } from '..';
import { omit } from 'lodash';

export class OperationObjectFactory {
    private readonly modelPropertiesAccessor = new ModelPropertiesAccessor();
    private readonly swaggerTypesMapper = new SwaggerTypesMapper();
    private readonly schemaObjectFactory = new SchemaObjectFactory(this.modelPropertiesAccessor, this.swaggerTypesMapper);

    create(operation: AsyncOperationOptions, produces: string[], schemas: SchemaObject[]): AsyncOperationObject {
        const { message } = operation as AsyncOperationOptions;
        const messagePayloadType = message.payload.type as Function;
        const name = this.schemaObjectFactory.exploreModelSchema(messagePayloadType, schemas);
        const discriminator = operation.message.payload.discriminator;
        if (operation.message.payload.discriminator) {
            var schema = schemas.find(s => s[name] !== undefined);
            if (schema) {
                schema[name].discriminator = discriminator;
            }
        }

        return this.toRefObject(operation, name, produces);
    }

    private toRefObject(operation: AsyncOperationOptions, name: string, produces: string[]): AsyncOperationObject {
        const asyncOperationObject = omit(operation, 'examples');

        return {
            ...asyncOperationObject,
            message: {
                name: operation.message.name,
                payload: {
                    $ref: getSchemaPath(name),
                    examples: operation.message.payload.examples,
                },
            },
        };
    }
}
