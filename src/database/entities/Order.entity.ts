import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { User } from "./User.entity";
import { OrderItem } from "./OrderItem.entity";

@Entity()
export class Order extends CommonEntity {

    @Column('float')
    totalPrice: number;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderItem, (orderitem) => orderitem.order , {onDelete: "CASCADE", cascade: true})
    items: OrderItem[];
}