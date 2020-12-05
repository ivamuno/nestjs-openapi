import { OpenApiExtraModels, OpenApiProperty } from '../../../../lib';
import { ExtraModel } from './extra-model.dto';
import { LettersEnum } from './pagination-query.dto';
import { TagDto } from './tag.dto';

@OpenApiExtraModels(ExtraModel)
export class CreateCatDto {
  @OpenApiProperty()
  readonly name: string;

  @OpenApiProperty({ minimum: 1, maximum: 200 })
  readonly age: number;

  @OpenApiProperty({ name: '_breed', type: String })
  readonly breed: string;

  @OpenApiProperty({
    type: [String]
  })
  readonly tags?: string[];

  @OpenApiProperty()
  createdAt: Date;

  @OpenApiProperty({
    type: 'string',
    isArray: true
  })
  readonly urls?: string[];

  @OpenApiProperty({
    type: 'array',
    items: {
      type: 'object',
      properties: {
        isReadonly: {
          type: 'string'
        }
      }
    }
  })
  readonly options?: Record<string, any>[];

  @OpenApiProperty({
    enum: LettersEnum,
    enumName: 'LettersEnum'
  })
  readonly enum: LettersEnum;

  @OpenApiProperty({
    enum: LettersEnum,
    enumName: 'LettersEnum',
    isArray: true
  })
  readonly enumArr: LettersEnum;

  @OpenApiProperty({ description: 'tag', required: false })
  readonly tag: TagDto;

  nested: {
    first: string;
    second: number;
  };
}
