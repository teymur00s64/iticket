import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/shared/decorators/roles.decorator";
import { UserRole } from "src/shared/enum/user.enum";
import { TicketTempService } from "./ticketTemp.service";
import { AuthGard } from "src/guards/auth.guard";
import { CreateTicketTempDto } from "./dto/ticketTemp-create.dto";
import { UpdateTicketTempDto } from "./dto/ticketTemp-update.dto";

@Controller('ticket-template')
@ApiTags('Ticket Template')
@ApiBearerAuth()
export class TicketTempController {

    constructor(
        private ticketTempService: TicketTempService
    ) {}
  
    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    find(@Param('id') id: number) {
       return this.ticketTempService.findOne({ where: { id }, relations: ['eventId'] });
    }
  
    @Post()
    @ApiBearerAuth()
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    create(@Body() body: CreateTicketTempDto): any {
     return this.ticketTempService.create(body);
    }
  
    @Post(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
     update(@Param('id') id: number, @Body() body: UpdateTicketTempDto) {
      return this.ticketTempService.update(id, body);
     }
  
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    delete(@Param('id') id: number) {
     return this.ticketTempService.delete(id);
    }

}