import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag';

@Entity('Person')
export class Person {
  public constructor(name: string, tags?: Array<Tag>, related?: Array<Person>) {
    this.name = name;
    if (tags) {
      this.tags = tags.map(tag => tag.id);
    }
    if (related) {
      this.related = related.map(person => person.id);
    }
    return this;
  }

  public composeWithID(
    id: number,
    name: string,
    tags?: Array<number>,
    related?: Array<number>,
  ): Person {
    this.id = id;
    this.name = name;
    if (tags) {
      this.tags = tags;
    }
    if (related) {
      this.related = related;
    }
    return this;
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  public id!: number;

  @Column({ name: 'name', nullable: false })
  public name!: string;

  @Column('int', { nullable: true, array: true, default: [] })
  public tags!: number[];

  @Column('int', { nullable: true, array: true, default: [] })
  public related!: number[];
}
