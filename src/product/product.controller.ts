/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException,HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ParsePositiveIntPipe } from 'src/parse-positive-int/parse-positive-int.pipe';
import { UpperCasePipe } from 'src/upper-case/upper-case.pipe';


@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create-product')
  create(@Body('category',UpperCasePipe) createProductDto: CreateProductDto) {
    if(createProductDto.price < 0 || createProductDto.quantity < 0) {
      throw new HttpException('Price or quantity must be a positive number', HttpStatus.BAD_REQUEST);
    }
    return this.productService.create(createProductDto);
  }

  @Get('find-all-products')
  findAll() {
    return this.productService.findAll();
  }

  @Get('find-product/:id')
  findOne(@Param('id',ParsePositiveIntPipe) id: string) {
    if(this.productService.findOne(+id) == null){
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return this.productService.findOne(+id);
  }

  @Patch('update-product/:id')
  update(@Param('id',ParsePositiveIntPipe) id: string, @Body() updateProductDto: UpdateProductDto) {
    if(this.productService.findOne(+id) == null){
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }else if((updateProductDto.price ?? -1) < 0 || (updateProductDto.quantity ?? -1) < 0) {
      throw new HttpException('Price or quantity must be a positive number', HttpStatus.BAD_REQUEST);
    }
    return this.productService.update(+id, updateProductDto);
  }

  @Delete('delete-product/:id')
  remove(@Param('id',ParsePositiveIntPipe) id: string) {
    if(this.productService.findOne(+id) == null){
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return this.productService.remove(+id);
  }
}
