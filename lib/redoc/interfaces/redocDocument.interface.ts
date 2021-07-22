import { OpenAPIObject } from '@nestjs/swagger';

import { LogoOptions, TagGroupOptions } from './redocOptions.interface';

export interface RedocDocument extends Partial<any> {
  info: OpenAPIObject['info'] & {
    'x-logo'?: LogoOptions;
  };
  'x-tagGroups': TagGroupOptions[];
}
