import { Type } from '@nestjs/common';

import { DECORATORS } from '..';

export const exploreAsyncapiChannelMetadata = (metatype: Type<unknown>) => {
    const result = Reflect.getMetadata(DECORATORS.ASYNCAPI_CHANNEL, metatype);
    return result;
};
