import { Document } from 'mongoose';
export declare class InstructorRating extends Document {
    userId: String;
    instructorId: String;
    courseId?: String;
    rating: number;
    createdAt: Date;
}
export declare const InstructorRatingSchema: import("mongoose").Schema<InstructorRating, import("mongoose").Model<InstructorRating, any, any, any, Document<unknown, any, InstructorRating> & InstructorRating & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InstructorRating, Document<unknown, {}, import("mongoose").FlatRecord<InstructorRating>> & import("mongoose").FlatRecord<InstructorRating> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
