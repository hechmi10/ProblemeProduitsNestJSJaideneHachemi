/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/schema/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private ProductModel:Model<Product>) {}
  async create(createProductDto: CreateProductDto):Promise<Product> {
    const newProduct = new this.ProductModel(createProductDto);
    return await newProduct.save();
  }

  findAll() {
    return this.ProductModel.find().exec();
  }

  findOne(id: number) {
    return this.ProductModel.findById(id).exec();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.ProductModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  remove(id: number) {
    return this.ProductModel.findByIdAndDelete(id).exec();
  }
}
