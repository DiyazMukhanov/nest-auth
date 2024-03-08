import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Request,
  Param,
  Body,
  Query,
  Put,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/updateCatDto';
import { CatsService } from './cats.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PermissionGuard } from 'src/auth/guards/permission.guard';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async createCat(@Body() createCatDto: CreateCatDto) {
    return this.catsService.createCat(createCatDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionGuard)
  @SetMetadata('permissions', ['read: cats'])
  async findAll() {
    return 'Worked!';
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    console.log(id);
    return `This action returns a #${id} cat`;
  }
}
