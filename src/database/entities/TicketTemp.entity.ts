import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { Event } from "./Event.entity";

@Entity('')
export class TicketTemp extends CommonEntity {

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Event, (event) => event.ticketTemps)
    @JoinColumn({ name: 'event_id' })
    eventId: Partial<Event>;

}