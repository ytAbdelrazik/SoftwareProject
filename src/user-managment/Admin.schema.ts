import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User, UserSchema } from './users.schema'; // Import the User schema
import { Document } from 'mongoose';

export type AdminDocument = Admin & Document;

@Schema()
export class Admin extends User {


}

export const AdminSchema = SchemaFactory.createForClass(Admin);

// Use the base UserSchema to inherit fields from User
AdminSchema.add(UserSchema);
