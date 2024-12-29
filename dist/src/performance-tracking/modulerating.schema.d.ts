import { Document } from 'mongoose';
export declare class Rating extends Document {
    userId: String;
    courseId: String;
    moduleId?: String;
    rating: number;
    createdAt: Date;
}
export declare const RatingSchema: import("mongoose").Schema<Rating, import("mongoose").Model<Rating, any, any, any, Document<unknown, any, Rating> & Rating & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Rating, Document<unknown, {}, import("mongoose").FlatRecord<Rating>> & import("mongoose").FlatRecord<Rating> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
