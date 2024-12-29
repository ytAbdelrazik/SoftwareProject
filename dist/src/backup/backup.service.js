"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const os = require("os");
const zlib = require("zlib");
let BackupService = class BackupService {
    constructor(connection) {
        this.connection = connection;
        this.backupInterval = null;
    }
    async fetchDataset() {
        const collections = await this.connection.db.listCollections().toArray();
        const dataset = {};
        for (const collection of collections) {
            const collectionName = collection.name;
            const data = await this.connection.db.collection(collectionName).find().toArray();
            dataset[collectionName] = data;
        }
        return dataset;
    }
    async createBackup() {
        const dataset = await this.fetchDataset();
        const compressedData = zlib.gzipSync(JSON.stringify(dataset, null, 2));
        const backupDir = path.join(os.homedir(), 'Desktop');
        if (!fs.existsSync(backupDir)) {
            fs.mkdirSync(backupDir);
        }
        const fileName = `backup-${new Date().toISOString().split('T')[0]}.json.gz`;
        const backupPath = path.join(backupDir, fileName);
        fs.writeFileSync(backupPath, compressedData);
        return `Backup saved to: ${backupPath}`;
    }
    async scheduleBackup(intervalDays) {
        if (this.backupInterval) {
            clearInterval(this.backupInterval);
        }
        const intervalMilliseconds = intervalDays * 24 * 60 * 60 * 1000;
        this.backupInterval = setInterval(async () => {
            console.log('Performing scheduled backup...');
            try {
                const backupPath = await this.createBackup();
                console.log(`Backup successful: ${backupPath}`);
            }
            catch (error) {
                console.error('Error during scheduled backup:', error);
            }
        }, intervalMilliseconds);
        await this.createBackup();
        return `Backup scheduled every ${intervalDays} day(s). Backup has been performed immediately.`;
    }
    stopBackupSchedule() {
        if (this.backupInterval) {
            clearInterval(this.backupInterval);
            this.backupInterval = null;
            return 'Backup schedule stopped.';
        }
        return 'No backup schedule is currently running.';
    }
};
exports.BackupService = BackupService;
exports.BackupService = BackupService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection])
], BackupService);
//# sourceMappingURL=backup.service.js.map