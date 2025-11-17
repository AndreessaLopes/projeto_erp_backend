import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./repository/category.repository";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  create(dto: CreateCategoryDto) {
    return this.categoryRepository.createCategory(dto);
  }

  findAll() {
    return this.categoryRepository.findAll();
  }

  findById(id: string) {
    return this.categoryRepository.findById(id);
  }

  findByName(name: string) {
    return this.categoryRepository.findByName(name);
  }

  update(id: string, dto: UpdateCategoryDto) {
    return this.categoryRepository.updateCategory(id, dto);
  }

  remove(id: string) {
    return this.categoryRepository.deleteCategory(id);
  }
}
