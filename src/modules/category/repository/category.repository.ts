import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "../entities/category.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>
  ) {}

  async createCategory(data: Partial<Category>): Promise<Category> {
    const category = this.repository.create(data);
    return this.repository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.repository.find({
      where: { active: true },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    return this.repository.findOne({
      where: { name, active: true },
    });
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne({
      where: { id, active: true },
    });

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    return category;
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    const category = await this.findById(id);
    Object.assign(category, data);
    return this.repository.save(category);
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.findById(id);

    await this.repository.update(id, {
      active: false,
      deletedAt: new Date(),
    });
  }
}
