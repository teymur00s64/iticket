import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
//import { Product } from "./Ticket.entity";
import { Order } from "./Order.entity";

@Entity()
export class OrderItem extends CommonEntity{
    @Column('float')
    price: number;

  //  @OneToOne(() => Product)
  //  @JoinColumn()
  //  product: Product;

    @Column()
    productId: number;

    @ManyToOne(() => Order, (order) => order.items)
    order: OrderItem;
}