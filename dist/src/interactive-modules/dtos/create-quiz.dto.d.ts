export declare class CreateQuizDto {
    quizId: string;
    moduleId: string;
    difficulty: string;
    numberOfQuestions: number;
    questionType: 'MCQ' | 'TF' | 'both';
}
