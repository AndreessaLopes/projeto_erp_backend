import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-products.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    createProduct(@Body() dto: CreateProductDto) {
        return this.productsService.create(dto);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Body('id') id: string) {
        return this.productsService.findById(id);
    }

    @Patch(':id')
    updateProduct(@Body('id') id: string, @Body() dto: CreateProductDto) {
        return this.productsService.update(id, dto);
    }

    @Delete(':id')
    deleteProduct(@Body('id') id: string) {
        return this.productsService.remove(id);
    }
}
