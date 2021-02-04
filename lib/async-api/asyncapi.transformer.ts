import { debounce, filter, flatten, groupBy, keyBy, mapValues, omit } from 'lodash';
import { AsyncAPIObject, AsyncChannelObject, AsyncChannelsObject } from '.';
import { DenormalizedDoc } from './interfaces/denormalized-doc.interface';

export class AsyncapiTransformer {
    public normalizeChannels(denormalizedDocs: DenormalizedDoc[]): Record<'channels', AsyncChannelsObject> {
        const flatChannels = denormalizedDocs.map((d: DenormalizedDoc) => {
            const key = d.root.name;            
            const value = {
                description: d.root.description,
                bindings: d.root.bindings,
                parameters: d.root.parameters,
                subscribe: d.operations.sub,
                publish: d.operations.pub,
            } as AsyncChannelObject;
            return { key, value };
        });
        const channels = flatChannels.reduce((acc, it) => {
            acc[it.key] = it.value;
            return acc;
        }, {});

        return { channels: channels };
    }
}
