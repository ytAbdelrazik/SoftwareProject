declare class QuestionDto {
    question: string;
    options: string[];
    answer: string;
    type: 'MCQ' | 'TF';
    difficulty: 'easy' | 'medium' | 'hard';
}
export declare class CreateQuestionDto {
    moduleId: string;
    questions: QuestionDto[];
}
export {};
