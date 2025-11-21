import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/products.entity";
import { CreateProductDto } from "../dto/create-products.dto";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>
  ) {}

  async createProduct(dto: CreateProductDto): Promise<Product> {
    const product = this.repository.create({
      name: dto.name,
      sku: dto.sku,
      description: dto.description,
      price: dto.price,
      category: dto.categoryId ? { id: dto.categoryId } as any : null,
    });

    return this.repository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find({
      where: { active: true },
    });
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findOne({
      where: { id, active: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    return this.repository.findOne({
      where: { name, active: true },
    });
  }

  async updateProduct(id: string, dto: Partial<CreateProductDto>): Promise<Product> {
    const product = await this.findById(id);

    if (dto.categoryId) {
      product.category = { id: dto.categoryId } as any;
      delete dto.categoryId;
    }

    Object.assign(product, dto);

    return this.repository.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await this.findById(id);

    await this.repository.update(id, {
      active: false,
      deletedAt: new Date(),
    });
  }
}