import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class StripContextPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { type } = metadata;

    if (type !== 'body') {
      return value;
    }

    if (value && value.context) {
      const { context, ...rest } = value;
      return rest;
    }

    return value;
  }
}
