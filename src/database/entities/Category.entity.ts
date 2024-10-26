import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CommonEntity } from './Common.entity';
import { Event } from './Event.entity';

@Entity()
export class Category extends CommonEntity {
    
  @Column()
  name: string;

  @ManyToMany(() => Event, (event) => event.categories, {onDelete: 'CASCADE'})
  @JoinTable({
    name: 'category_event'
  })
  events: Event[];

}