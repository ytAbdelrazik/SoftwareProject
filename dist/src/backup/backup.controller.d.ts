import { BackupService } from './backup.service';
export declare class BackupController {
    private readonly backupService;
    constructor(backupService: BackupService);
    scheduleBackup(intervalDays: number): Promise<string>;
    stopBackupSchedule(): Promise<string>;
}
