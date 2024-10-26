import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { ImageEntity } from "./Image.entity";
import { Category } from "./Category.entity";
import { Venue } from "./Venue.entity";

@Entity()
export class Event extends CommonEntity {

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    language: string;

    @Column()
    ageReq: number;

    @ManyToOne(() => Venue, (venue) => venue.events)
    @JoinColumn({ name: 'venue_id' })
    venue: Partial<Venue>;

    @ManyToMany(() => Category, (category) => category.events, {onDelete: 'CASCADE'})
    categories: Partial<Category>[];

    @OneToOne(() => ImageEntity)
    @JoinColumn({ name: 'image_id' })
    imageId: Partial<ImageEntity>;

    @Column()
    date: Date;
}