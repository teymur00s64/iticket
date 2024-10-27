import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TicketTemp } from "src/database/entities/TicketTemp.entity";
import { EventsModule } from "../events/events.module";
import { TicketTempController } from "./ticketTemp.controller";
import { TicketTempService } from "./ticketTemp.service";

@Module({

    imports:[TypeOrmModule.forFeature([TicketTemp]), EventsModule],
    controllers: [TicketTempController], 
    providers: [TicketTempService],
    exports: [TicketTempService]

})

export class TicketTempModule{}