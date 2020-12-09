import { createMixedDecorator } from '@nestjs/swagger/dist/decorators/helpers';
import { DECORATORS } from './constants';

export declare const CHANNEL_NAME = 'name';
export declare const CHANNEL_DESCRIPTION = 'description';

export interface AsyncChannelOptions {
    name: string;
    description?: string;
}

export declare type Channel = object;

export function AsyncApiChannel(options: AsyncChannelOptions) {
    return createMixedDecorator(DECORATORS.ASYNCAPI_CHANNEL, options);
}
