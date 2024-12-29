import { Connection } from 'mongoose';
export declare class BackupService {
    private readonly connection;
    private backupInterval;
    constructor(connection: Connection);
    private fetchDataset;
    createBackup(): Promise<string>;
    scheduleBackup(intervalDays: number): Promise<string>;
    stopBackupSchedule(): string;
}
