import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '@/Domain/Authentication/Domain/Entity/User';
import { ChatRoom } from '@/Domain/ChatRoom/Domain/Entity/ChatRoom';

@Entity()
export class BotMessage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user!: User;

  @OneToOne(() => ChatRoom)
  @JoinColumn({ name: 'roomId' })
  roomId!: ChatRoom;

  @Column({ type: 'boolean', default: false, name: 'is_reply' })
  isReply!: boolean;

  @ManyToOne(() => BotMessage, (botMessage) => botMessage.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent_message_id' })
  parentMessageId!: BotMessage;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt!: Date;
}
