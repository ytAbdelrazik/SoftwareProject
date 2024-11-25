import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
export type RecommendationDoucument = HydratedDocument<Recommendation>
@Schema()
export class Recommendation {
 

  @ManyToOne(() => User, (user) => user.recommendations)
  user: User; // Associated user entity

  @Column('simple-array')
  recommendedItems: string[]; // Array of recommended courses/modules

  @CreateDateColumn()
  generatedAt: Date; // Timestamp of recommendation generation
}