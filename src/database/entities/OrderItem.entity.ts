import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { Order } from "./Order.entity";
import { TicketEntity } from "./Ticket.entity";

@Entity()
export class OrderItem extends CommonEntity{
    @Column('float')
    price: number;

    @OneToOne(() => TicketEntity)
    @JoinColumn()
    ticket: TicketEntity;

    @Column()
    ticketId: number;

    @ManyToOne(() => Order, (order) => order.items)
    order: OrderItem;
}