import { Type } from '@nestjs/common';
import { MetadataScanner } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { DECORATORS } from '.';
import { exploreAsyncapiChannelMetadata, exploreAsyncapiOperationMetadata } from './explorers';
import { DenormalizedDocResolvers } from './interfaces/denormalized-doc-resolvers.interface';
import { DenormalizedDoc } from './interfaces/denormalized-doc.interface';

export class AsyncApiExplorer {
  private readonly metadataScanner = new MetadataScanner();
  private readonly schemas: SchemaObject[] = [];
  private readonly schemaRefsStack: string[] = [];
  private operationIdFactory = (controllerKey: string, methodKey: string) => (controllerKey ? `${controllerKey}_${methodKey}` : methodKey);

  public exploreChannel(
    wrapper: InstanceWrapper<any>,
    modulePath?: string,
    globalPrefix?: string,
    operationIdFactory?: (controllerKey: string, methodKey: string) => string
  ) {
    if (operationIdFactory) {
      this.operationIdFactory = operationIdFactory;
    }

    const { instance, metatype } = wrapper;
    if (!instance || !metatype || !Reflect.getMetadataKeys(metatype).find(x => x === DECORATORS.ASYNCAPI_CHANNEL)) {
      return [];
    }

    const prototype = Object.getPrototypeOf(instance);
    const documentResolvers: DenormalizedDocResolvers = {
      root: [exploreAsyncapiChannelMetadata],
      security: [],
      tags: [],
      operations: [exploreAsyncapiOperationMetadata],
    };

    return this.generateDenormalizedDocument(metatype as Type<unknown>, prototype, instance, documentResolvers, modulePath, globalPrefix);
  }

  public getSchemas(): SchemaObject[] {
    return this.schemas;
  }

  private generateDenormalizedDocument(
    metatype: Type<unknown>,
    prototype: Type<unknown>,
    instance: object,
    documentResolvers: DenormalizedDocResolvers,
    _modulePath?: string,
    _globalPrefix?: string
  ): DenormalizedDoc[] {
    const denormalizedChannels = this.metadataScanner.scanFromPrototype<any, DenormalizedDoc>(instance, prototype, name => {
      const targetCallback = prototype[name];
      const methodMetadata = documentResolvers.root.reduce((_metadata, fn) => {
        const channelMetadata = fn(metatype);
        return {
          root: Object.assign(channelMetadata, { name: channelMetadata.name }),
          operations: documentResolvers.operations.reduce((_metadata2, fn2) => {
            return fn2(this.schemas, this.schemaRefsStack, instance, prototype, targetCallback);
          }, {}),
        };
      }, {});
      return methodMetadata;
    });

    return denormalizedChannels;
  }
}
