export declare class AddMultimediaDto {
    resourceType: 'video' | 'pdf' | 'image';
    url: string;
    title: string;
    description?: string;
    uploadedAt?: Date;
}
