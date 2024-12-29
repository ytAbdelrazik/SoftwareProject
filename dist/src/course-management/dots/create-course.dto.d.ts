declare class MultimediaDto {
    instructorId: string;
    resourceType: string;
    url: string;
    title: string;
    description?: string;
}
export declare class CreateCourseDto {
    courseId: string;
    title: string;
    description: string;
    category: string;
    difficultyLevel: 'Beginner' | 'Intermediate' | 'Advanced';
    createdBy: string;
    multimedia?: MultimediaDto[];
}
export {};
