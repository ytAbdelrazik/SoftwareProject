import { Document } from 'mongoose';
export type QuestionBankDocument = QuestionBank & Document;
export declare class QuestionBank {
    moduleId: string;
    questions: {
        question: string;
        options: string[];
        answer: string;
        type: 'MCQ' | 'TF';
        difficulty: 'easy' | 'medium' | 'hard';
    }[];
}
export declare const QuestionBankSchema: import("mongoose").Schema<QuestionBank, import("mongoose").Model<QuestionBank, any, any, any, Document<unknown, any, QuestionBank> & QuestionBank & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, QuestionBank, Document<unknown, {}, import("mongoose").FlatRecord<QuestionBank>> & import("mongoose").FlatRecord<QuestionBank> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
