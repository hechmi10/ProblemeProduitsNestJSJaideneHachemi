/* eslint-disable prettier/prettier */
import { Injectable, PipeTransform } from '@nestjs/common';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class ProductValidationPipe implements PipeTransform {
  transform(value: Product) {
    if(!value.name || !value.price || !value.category) {
      throw new Error('Invalid product data');  // throw new BadRequestException('Invalid product data');
    }else if(value.price < 0 || value.quantity < 0) {
        throw new Error('Price or quantity must be a positive number'); // throw new BadRequestException('Price must be a positive number');
    
    }else{
        return value;
    }
    
    
  }
}
