import { Order } from "src/database/entities/Order.entity";
import { FindOptionsSelect, FindOptionsWhere } from "typeorm";

export interface FindOrderParams{
    where?:FindOptionsWhere<Order>
    select?:FindOptionsSelect<Order>
    relations?: string[]
    pagination?: {
        limit: number
        page: number
    }
}