declare class AnswerDto {
    questionId: string;
    selectedOption: string;
}
export declare class SubmitResponseDto {
    quizId: string;
    studentId: string;
    answers: AnswerDto[];
}
export {};
