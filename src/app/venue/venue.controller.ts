import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { AuthGard } from 'src/guards/auth.guard';
  import { Roles } from 'src/shared/decorators/roles.decorator';
  import { UserRole } from 'src/shared/enum/user.enum';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { FindVenueDto } from './dto/search-venue.dto';
  
  @Controller('venue')
  @ApiTags('Venue')
  @ApiBearerAuth()
  export class VenueController {
    constructor(    
        private venueService: VenueService  
    ) {}
  
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    @Get()
    search(@Query() query: FindVenueDto) {
      return this.venueService.searchByName();
    }
  
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    @Get(':id')
    venueById(@Param('id') id: number) {
      return this.venueService.findOne({ where: { id } });
    }
  
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    @Post()
    create(@Body() body: CreateVenueDto) {
      return this.venueService.create(body);
    }

    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    @Post(':id')
    update(@Param('id') id: number, @Body() body: UpdateVenueDto) {
    return this.venueService.update(id, body);
    }
  
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    delete(@Param('id') id: number) {
      return this.venueService.delete(id);
    }
  }