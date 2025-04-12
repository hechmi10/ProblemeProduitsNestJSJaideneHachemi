/* eslint-disable prettier/prettier */
import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParsePositiveIntPipe implements PipeTransform {
  transform(value: number){
    if(value>=0){
      return value;
    }
  }
}
