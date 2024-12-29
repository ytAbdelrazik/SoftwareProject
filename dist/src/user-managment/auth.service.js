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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_service_1 = require("../user-managment/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(userService, jwtService, failedLoginModel) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.failedLoginModel = failedLoginModel;
        this.adminPassphrase = 'admin';
        this.instructorPassphrase = 'inst';
    }
    async logFailedAttempt(email, reason, ipAddress, userAgent) {
        await this.failedLoginModel.create({
            email,
            reason,
            ipAddress,
            userAgent,
        });
    }
    generateUserId(role) {
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        switch (role) {
            case 'admin':
                return `AD${randomNumber}`;
            case 'instructor':
                return `IS${randomNumber}`;
            case 'student':
                return `ST${randomNumber}`;
            default:
                throw new common_1.BadRequestException('Invalid role');
        }
    }
    async signUp(userDto) {
        if (userDto.role === 'admin' && userDto.passphrase !== this.adminPassphrase) {
            throw new common_1.UnauthorizedException('Invalid passphrase for admin role');
        }
        if (userDto.role === 'instructor' && userDto.passphrase !== this.instructorPassphrase) {
            throw new common_1.UnauthorizedException('Invalid passphrase for instructor role');
        }
        const userId = this.generateUserId(userDto.role);
        const hashedPassword = await bcrypt.hash(userDto.password, 10);
        const newUser = {
            userId,
            name: userDto.name,
            email: userDto.email,
            passwordHash: hashedPassword,
            role: userDto.role,
        };
        return this.userService.createUser(newUser);
    }
    async validateUser(email, password, ipAddress, userAgent) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
            await this.logFailedAttempt(email, 'User not found', ipAddress, userAgent);
            return null;
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            await this.logFailedAttempt(email, 'Invalid password', ipAddress, userAgent);
            return null;
        }
        return user;
    }
    async login(email, password, ipAddress, userAgent) {
        const user = await this.validateUser(email, password, ipAddress, userAgent);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            email: user.email,
            role: user.role,
            userId: user.userId,
            name: user.name
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectModel)('FailedLogin')),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map