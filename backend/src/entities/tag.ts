import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Tag' })
export class Tag {
  public constructor(value: string) {
    this.value = value;
  }

  @PrimaryGeneratedColumn({ name: 'id' })
  public id!: number;

  @Column({ name: 'value', nullable: false })
  public value!: string;
}
