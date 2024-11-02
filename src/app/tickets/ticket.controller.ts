import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { TicketService } from "./ticket.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGard } from "src/guards/auth.guard";
import { UserRole } from "src/shared/enum/user.enum";
import { Roles } from "src/shared/decorators/roles.decorator";
import { CreateTicketDto } from "./dto/create-ticket.dto";

@Controller()
@ApiTags('Ticket')
export class TicketController {
    constructor(
        private ticketService: TicketService
    ) {}

    @Get(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    find(@Param('id') id: number) {
       return this.ticketService.findOne({ where: { id }, relations: ['eventId'] });
    }
  
    @Delete(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    delete(@Param('id') id: number) {
     return this.ticketService.delete(id);
    }

    @Post(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    acceptTicket(@Param('id') id: number) {
     return this.ticketService.acceptTicket(id);
    }

    @Post(':id')
    @ApiBearerAuth()
    @UseGuards(AuthGard)
    @Roles(UserRole.ADMIN)
    rejectTicket(@Param('id') id: number) {
     return this.ticketService.rejectTicket(id);
    }
}