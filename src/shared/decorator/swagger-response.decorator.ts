import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { BaseResponseDto } from '../dto/base-response.dto';
import { PaginatedResponseDto } from 'src/pagination/dto/pagination.dto';

export const ApiOkWrappedResponse = <TModel extends Type<any>>(
  model: TModel,
  description: string,
) => {
  return applyDecorators(
    ApiExtraModels(BaseResponseDto, model),
    ApiOkResponse({
      description: description,
      schema: {
        allOf: [
          { $ref: getSchemaPath(BaseResponseDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    }),
  );
};

export const ApiOkWrappedPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
  description: string,
) => {
  return applyDecorators(
    ApiExtraModels(PaginatedResponseDto, model),
    ApiOkResponse({
      description: description,
      schema: {
        allOf: [
          {
            $ref: getSchemaPath(PaginatedResponseDto),
          },
          {
            properties: {
              status: {
                type: 'boolean',
              },
              message: {
                type: 'string',
              },
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
