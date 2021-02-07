import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  OpenApiBearerAuth, OpenApiConsumes, OpenApiExtension, OpenApiHeader, OpenApiOperation, OpenApiQuery, OpenApiResponse, OpenApiSecurity, OpenApiTags
} from '@ivamuno/nestjs-openapi';

import { CatsService } from './cats.service';
import { Cat } from './classes/cat.class';
import { CreateCatDto } from './dto/create-cat.dto';
import { PaginationQuery } from './dto/pagination-query.dto';

@OpenApiSecurity('basic')
@OpenApiBearerAuth()
@OpenApiTags('cats')
@OpenApiHeader({
  name: 'header',
  required: false,
  description: 'Test',
  schema: { default: 'test' }
})
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @OpenApiTags('create cats')
  @Post()
  @OpenApiOperation({
    summary: 'Create cat',
    examples: {
      'MyCat':
        { value: { name: 'Yuumi', breed: { name: 'British Shorthair', height: 99 } } },
      'AnotherCat':
        { value: { name: 'Kitty', breed: { name: 'Maine Coon', weight: 10 } } }
    }
  })
  @OpenApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: () => Cat,
    examples: { 'Full': { value: { name: 'Yuumi' } as Cat } }
  })
  @OpenApiResponse({ status: 403, description: 'Forbidden.' })
  @OpenApiExtension('x-foo', { test: 'bar ' })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get(':id')
  @OpenApiResponse({
    status: 200,
    description: 'The found record',
    type: Cat
  })
  @OpenApiExtension('x-auth-type', 'NONE')
  findOne(@Param('id') id: string): Cat {
    return this.catsService.findOne(+id);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQuery) { }

  @OpenApiQuery({ type: PaginationQuery })
  @Get('explicit-query')
  findAllWithExplicitQuery(paginationQuery: PaginationQuery) { }

  @Get('bulk')
  findAllBulk(@Query() paginationQuery: PaginationQuery[]) { }

  @Post('bulk')
  async createBulk(@Body() createCatDto: CreateCatDto[]): Promise<Cat> {
    return null;
  }

  @OpenApiConsumes('application/x-www-form-urlencoded')
  @Post('as-form-data')
  @OpenApiOperation({ summary: 'Create cat' })
  @OpenApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: Cat
  })
  @OpenApiResponse({ status: 403, description: 'Forbidden.' })
  async createAsFormData(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get('site*')
  getSite() { }
}
