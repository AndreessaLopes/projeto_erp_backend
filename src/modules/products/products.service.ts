import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './repository/products.repository';
import { CreateProductDto } from './dto/create-products.dto';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRespository: ProductsRepository) { }

    create(dto: CreateProductDto) {
        return this.productsRespository.createProduct(dto);
    }

    findAll() {
        return this.productsRespository.findAll();
    }

    findById(id: string) {
        return this.productsRespository.findById(id);
    }

    findByName(name: string) {
        return this.productsRespository.findByName(name);
    }
    
    update(id: string, dto: Partial<CreateProductDto>) {
        return this.productsRespository.updateProduct(id, dto);
    }
    remove(id: string) {
        return this.productsRespository.deleteProduct(id);
    }
}
