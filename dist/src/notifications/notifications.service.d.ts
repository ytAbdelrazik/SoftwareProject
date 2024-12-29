import { Model } from 'mongoose';
import { Notification } from 'src/notifications/notifications.schema';
export declare class NotificationService {
    private notificationModel;
    constructor(notificationModel: Model<Notification>);
    createNotification(userId: string, message: string, type: string): Promise<Notification>;
    getUnreadNotifications(userId: string): Promise<Notification[]>;
    markAsRead(notificationId: string): Promise<Notification>;
}
