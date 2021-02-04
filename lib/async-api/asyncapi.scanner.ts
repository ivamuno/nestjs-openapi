import { INestApplication, Type } from '@nestjs/common';
import { MODULE_PATH } from '@nestjs/common/constants';
import { NestContainer } from '@nestjs/core/injector/container';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { stripLastSlash } from '@nestjs/swagger/dist/utils/strip-last-slash.util';
import { extend, flatten, isEmpty, reduce } from 'lodash';

import { AsyncApiExplorer, AsyncAPIObject } from '.';
import { AsyncApiDocumentOptions } from './asyncapi.module';
import { AsyncapiTransformer } from './asyncapi.transformer';
import { DenormalizedDoc } from './interfaces/denormalized-doc.interface';

export class AsyncapiScanner {
    private readonly transfomer = new AsyncapiTransformer();
    private readonly explorer = new AsyncApiExplorer();

    public scanApplication(app: INestApplication, options: AsyncApiDocumentOptions): Omit<AsyncAPIObject, 'asyncapi' | 'info'> {
        const { deepScanRoutes, include: includedModules = [], extraModels = [], ignoreGlobalPrefix = false, operationIdFactory } = options;

        const container: NestContainer = (app as any).container;
        const modules: Module[] = this.getModules(container.getModules(), includedModules);
        const globalPrefix = !ignoreGlobalPrefix ? stripLastSlash(this.getGlobalPrefix(app)) : '';

        const denormalizedChannels = modules.map(({ components, metatype, relatedModules }) => {
            let allComponents = new Map(components);

            if (deepScanRoutes) {
                // only load submodules routes if asked
                const isGlobal = (module: Type<any>) => !container.isGlobalModule(module);

                Array.from(relatedModules.values())
                    .filter(isGlobal as any)
                    .map(({ components: relatedComponents }) => relatedComponents)
                    .forEach(relatedComponents => {
                        allComponents = new Map([...allComponents, ...relatedComponents]);
                    });
            }
            const path = metatype ? Reflect.getMetadata(MODULE_PATH, metatype) : undefined;

            return this.scanModuleComponents(allComponents, path, globalPrefix, operationIdFactory);
        });

        var normalizedChannels = this.transfomer.normalizeChannels(flatten(denormalizedChannels));
        var components = { schemas: reduce(this.explorer.getSchemas(), extend) as Record<string, SchemaObject> };
        return {
            ...normalizedChannels,
            components: components,
        };
    }

    private scanModuleComponents(
        components: Map<string, InstanceWrapper>,
        modulePath?: string,
        globalPrefix?: string,
        operationIdFactory?: (controllerKey: string, methodKey: string) => string
    ): Array<DenormalizedDoc> {
        const denormalizedArray = [...components.values()].map(comp => 
            this.explorer.exploreChannel(comp, modulePath, globalPrefix, operationIdFactory)
        );
        
        return flatten(denormalizedArray) as any;
    }

    private getModules(modulesContainer: Map<string, Module>, include: Function[]): Module[] {
        if (!include || isEmpty(include)) {
            return [...modulesContainer.values()];
        }
        return [...modulesContainer.values()].filter(({ metatype }) => include.some(item => item === metatype));
    }

    private getGlobalPrefix(app: INestApplication): string {
        const internalConfigRef = (app as any).config;
        return (internalConfigRef && internalConfigRef.getGlobalPrefix()) || '';
    }
}
