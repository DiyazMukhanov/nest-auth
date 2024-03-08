import { Injectable } from '@nestjs/common';
import { Cat } from './cats.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private catsRepository: Repository<Cat>,
  ) {}

  async createCat(createCatDto: CreateCatDto): Promise<Cat> {
    const newCat: Cat = new Cat();
    newCat.firstName = createCatDto.firstName;
    newCat.lastName = createCatDto.lastName;
    return await this.catsRepository.save(newCat);
  }

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat | null> {
    return this.catsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }
}
