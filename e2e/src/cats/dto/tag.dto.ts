import { OpenApiProperty } from '../../../../lib';

export class TagDto {
  @OpenApiProperty({ description: 'name' })
  name: string;
}
