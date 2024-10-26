import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { CategoryService } from './category.service';
  import { CreateCategoryDto } from './dto/create-category.dto';
  import { AuthGard } from 'src/guards/auth.guard';
  import { Roles } from 'src/shared/decorators/roles.decorator';
  import { UserRole } from 'src/shared/enum/user.enum';
  
  @Controller('category')
  @ApiTags('Category')
  @ApiBearerAuth()
  export class CategoryController {
    constructor(
        
        private categoryService: CategoryService
    
    ) {}
  
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    @Get()
    list() {
      return this.categoryService.find();
    }
  
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    @Get(':id')
    item(@Param('id') id: number) {
      return this.categoryService.findOne({ where: { id }, relations: ['categories'] });
    }
  
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    @Post()
    create(@Body() body: CreateCategoryDto) {
      return this.categoryService.create(body);
    }
  
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    delete(@Param('id') id: number) {
      return this.categoryService.delete(id);
    }
  }