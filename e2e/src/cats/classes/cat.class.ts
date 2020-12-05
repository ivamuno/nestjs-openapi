import { OpenApiProperty } from '../../../../lib';
import { LettersEnum } from '../dto/pagination-query.dto';

export class Cat {
  @OpenApiProperty({ example: 'Kitty', description: 'The name of the Cat' })
  name: string;

  @OpenApiProperty({ example: 1, minimum: 0, description: 'The age of the Cat' })
  age: number;

  @OpenApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat'
  })
  breed: string;

  @OpenApiProperty({
    name: '_tags',
    type: [String]
  })
  tags?: string[];

  @OpenApiProperty()
  createdAt: Date;

  @OpenApiProperty({
    type: String,
    isArray: true
  })
  urls?: string[];

  @OpenApiProperty({
    name: '_options',
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
  options?: Record<string, any>[];

  @OpenApiProperty({
    enum: LettersEnum
  })
  enum: LettersEnum;

  @OpenApiProperty({
    enum: LettersEnum,
    isArray: true
  })
  enumArr: LettersEnum;
}
