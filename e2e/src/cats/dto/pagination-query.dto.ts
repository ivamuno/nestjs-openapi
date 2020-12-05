import { OpenApiProperty } from '../../../../lib';

export enum LettersEnum {
  A = 'A',
  B = 'B',
  C = 'C'
}

export class PaginationQuery {
  @OpenApiProperty({
    minimum: 0,
    maximum: 10000,
    title: 'Page',
    exclusiveMaximum: true,
    exclusiveMinimum: true,
    format: 'int32',
    default: 0
  })
  page: number;

  @OpenApiProperty({
    name: '_sortBy'
  })
  sortBy: string[];

  @OpenApiProperty()
  limit: number;

  @OpenApiProperty({
    enum: LettersEnum,
    enumName: 'LettersEnum'
  })
  enum: LettersEnum;

  @OpenApiProperty({
    enum: LettersEnum,
    enumName: 'LettersEnum',
    isArray: true
  })
  enumArr: LettersEnum;

  @OpenApiProperty()
  beforeDate: Date;

  static _OPENAPI_METADATA_FACTORY() {
    return {
      sortBy: { type: () => [String] }
    };
  }
}
