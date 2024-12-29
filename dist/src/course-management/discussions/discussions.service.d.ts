import { Model } from 'mongoose';
import { Discussion } from './discussions.schema';
import { Comment } from './comments.schema';
export declare class DiscussionsService {
    private discussionModel;
    private commentModel;
    constructor(discussionModel: Model<Discussion>, commentModel: Model<Comment>);
    getDiscussionsByCourse(courseId: string): Promise<Discussion[]>;
    createDiscussion(courseId: string, userId: string, role: string, content: string): Promise<Discussion>;
    getCommentsByForum(forumId: string): Promise<Comment[]>;
    createComment(forumId: string, userId: string, role: string, content: string): Promise<Comment>;
}
