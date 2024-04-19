import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Suggestion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @Column({ type: 'int', default: null, name: 'user_id' })
  userId!: number;

  @Column({ type: 'int', default: null, name: 'ticket_id' })
  ticketId!: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;
}
