/* eslint-disable prettier/prettier */
import {  Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpperCasePipe implements PipeTransform {
  transform(value: string) {
    return value.toUpperCase();
  }
}
