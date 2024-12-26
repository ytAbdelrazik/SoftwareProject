import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './notifications.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<Notification>) {}

  async createNotification(recipientId: string, message: string, type: string): Promise<Notification> {
    const notification = new this.notificationModel({ recipientId, message, type });
    return notification.save();
  }

  async getNotifications(recipientId: string): Promise<Notification[]> {
    return this.notificationModel.find({ recipientId }).sort({ createdAt: -1 }).exec();
  }

  async markAsRead(notificationId: string): Promise<Notification> {
    return this.notificationModel.findByIdAndUpdate(notificationId, { isRead: true }, { new: true }).exec();
  }
}
