import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { Event } from "./Event.entity";
import { TicketStatus } from "src/shared/enum/ticket.enum";

@Entity()
export class TicketEntity extends CommonEntity {

    @Column({ type: 'float' })
    price: number;

    @Column()
    seat: number;

    @Column({
        type: 'enum',
        enum: TicketStatus
    })
    status: TicketStatus;
    
    @ManyToOne(() => Event, (event) => event.tickets)
    @JoinColumn({ name: 'event_id' })
    eventId: Partial<Event>;
    
    
}