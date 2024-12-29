"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const backup_controller_1 = require("./backup.controller");
const backup_service_1 = require("./backup.service");
const roles_guard_1 = require("../user-managment/roles.guard");
const core_1 = require("@nestjs/core");
const mongoose_1 = require("@nestjs/mongoose");
let BackupModule = class BackupModule {
};
exports.BackupModule = BackupModule;
exports.BackupModule = BackupModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: 'ahmed',
                signOptions: { expiresIn: '1h' },
            }),
            mongoose_1.MongooseModule.forFeature([]),
        ],
        controllers: [backup_controller_1.BackupController],
        providers: [
            backup_service_1.BackupService,
            roles_guard_1.RolesGuard,
            core_1.Reflector,
        ],
    })
], BackupModule);
//# sourceMappingURL=backup.module.js.map