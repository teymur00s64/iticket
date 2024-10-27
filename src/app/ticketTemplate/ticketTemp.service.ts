import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TicketTemp } from "src/database/entities/TicketTemp.entity";
import { FindParams } from "src/shared/types/find.params";
import { FindManyOptions, Repository } from "typeorm";
import { CreateTicketTempDto } from "./dto/ticketTemp-create.dto";
import { EventsService } from "../events/events.service";
import { UpdateTicketTempDto } from "./dto/ticketTemp-update.dto";
import { TICKET_TEMP_BASIC_SELECT } from "./ticketTemp.select";

@Injectable()
export class TicketTempService {

    constructor(
        private eventService: EventsService,
        @InjectRepository(TicketTemp)
        private ticketTempRepo: Repository<TicketTemp>,
    ) {}

    findAll(params: FindParams<TicketTemp>){
        const {where, select, relations, limit, page} = params;
        const payload:FindManyOptions<TicketTemp> = {where, select, relations}
    
        if(limit>0) {
          payload.take = limit;
          payload.skip = limit* page
        }

        return this.ticketTempRepo.find(payload)
      }

      findOne(params: Omit<FindParams<TicketTemp>, 'limit' | 'page'>) {
        const { where, relations, select } = params;
        return this.ticketTempRepo.findOne({ where, relations, select: TICKET_TEMP_BASIC_SELECT });
      }
      async create(params: CreateTicketTempDto) {
        let checkTicketEvent = await this.eventService.findOne({ where: { id: params.eventId } });
        if (!checkTicketEvent)
          throw new ConflictException('This event does not exists');
        
       const existingTemp = await this.eventService.existingTemp(params);
       if (existingTemp)
         throw new ConflictException('This template already exists');

        let event = await this.ticketTempRepo.create({
              ...params,
              eventId: { id: params.eventId },
            });
            await event.save();
            return {
              status: true,
              event,
            };
      }

      async update(id: number, params: UpdateTicketTempDto) {
        let event = await this.findOne({ where: { id } });
        
        event.quantity = params.quantity;
    
        await event.save();
    
        return event;
      }
    
      async delete(id: number) {
        let event = await this.ticketTempRepo.findOne({where: { id }})
        if (!event) throw new NotFoundException();
        
        let result = await this.ticketTempRepo.delete({ id });
        if (result.affected === 0) throw new InternalServerErrorException();
    
        await this.ticketTempRepo.delete({ id });
        
        return {
          message: 'Ticket Template deleted successfully',
        };
      }
    

}