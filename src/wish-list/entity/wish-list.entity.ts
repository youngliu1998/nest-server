import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WishList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  wish_text: string;

  @Column({ default: true })
  is_completed: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: 1 })
  user_id: number;
}
