import { DiscussionsService } from './discussions.service';
export declare class DiscussionsController {
    private readonly discussionsService;
    constructor(discussionsService: DiscussionsService);
    getDiscussions(courseId: string): Promise<import("./discussions.schema").Discussion[]>;
    createDiscussion(courseId: string, content: string, req: any): Promise<import("./discussions.schema").Discussion>;
    getComments(forumId: string): Promise<import("./comments.schema").Comment[]>;
    createComment(forumId: string, content: string, req: any): Promise<import("./comments.schema").Comment>;
}
