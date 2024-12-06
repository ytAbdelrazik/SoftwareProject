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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_service_1 = require("../user-managment/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.adminPassphrase = 'admin';
        this.instructorPassphrase = 'inst';
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
            profilePictureUrl: userDto.profilePictureUrl || null,
        };
        return this.userService.createUser(newUser);
    }
    async validateUser(email, password) {
        const user = await this.userService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.passwordHash))) {
            const { passwordHash, ...result } = user.toObject();
            return result;
        }
        return null;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { email: user.email, role: user.role, sub: user.userId };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map