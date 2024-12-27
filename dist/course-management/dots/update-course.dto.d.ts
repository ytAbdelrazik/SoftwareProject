declare class MultimediaDto {
    resourceType?: string;
    url?: string;
    title?: string;
    description?: string;
}
export declare class UpdateCourseDto {
    title?: string;
    description?: string;
    category?: string;
    multimedia?: MultimediaDto[];
}
export {};
