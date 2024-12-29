import { HydratedDocument } from 'mongoose';
import { User } from 'src/user-managment/users.schema';
import * as mongoose from 'mongoose';
export type RecommendationDocument = HydratedDocument<Recommendation>;
export declare class Recommendation {
    user: User;
    recommendedItems: string[];
    generatedAt: Date;
}
export declare const RecommendationSchema: mongoose.Schema<Recommendation, mongoose.Model<Recommendation, any, any, any, mongoose.Document<unknown, any, Recommendation> & Recommendation & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Recommendation, mongoose.Document<unknown, {}, mongoose.FlatRecord<Recommendation>> & mongoose.FlatRecord<Recommendation> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
