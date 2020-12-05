import { OpenApiProperty } from '../../../../lib';

export class ExtraModel {
  @OpenApiProperty()
  readonly one: string;

  @OpenApiProperty()
  readonly two: number;
}
