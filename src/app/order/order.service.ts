import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/database/entities/Order.entity";
import { In, Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { TicketService } from "../tickets/ticket.service";
import { FindParams } from "src/shared/types/find.params";
import { TicketStatus } from "src/shared/enum/ticket.enum";

@Injectable()
export class OrderService {
    constructor(
        private ticketService:  TicketService,
        
        @InjectRepository(Order)
        private orderRepo:  Repository<Order>

    ){}

    find(params?:FindParams<Order>){
        let {where, select, relations, limit, page} = params || {}
        return this.orderRepo.find({
            where,
            select,
            relations,
            take: limit,
            skip: page * limit
        })
    }

    findOne(id:number){
        return this.orderRepo.findOne({where: {id}})
    }

    async create(params: CreateOrderDto){
        let ticketIds: number[] = params.items.map((item) => item.ticketId)
        let tickets = await this.ticketService.findAll({
            where: {id: In(ticketIds)},
        })

        let totalPrice = 0;
        for(let ticket of tickets)
        {
            if(ticket.status ===TicketStatus.ACCEPTED){
            totalPrice+= ticket.price;
            }
        }
        let items = tickets.map((ticket) => {
            return {
                amount: ticket.price,
                ticket
            }
        })
        const order = this.orderRepo.create({...params, totalPrice, items})
        await order.save()
        return order
    }
}