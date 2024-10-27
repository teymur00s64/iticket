import { TicketTemp } from "src/database/entities/TicketTemp.entity";
import { FindOptionsSelect } from "typeorm";

export const TICKET_TEMP_BASIC_SELECT : FindOptionsSelect<TicketTemp> = {
    id: true,
    price: true,
    quantity: true,
    eventId: {
        name: true,
        date: true,
        ageReq: true,
        venue: {
            name: true,
        },
        categories: {
            name: true
        }
    }
};