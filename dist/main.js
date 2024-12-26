"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const roles_guard_1 = require("./user-managment/roles.guard");
const core_2 = require("@nestjs/core");
const jwt_service_1 = require("@nestjs/jwt/dist/jwt.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const reflector = app.get(core_2.Reflector);
    app.useGlobalGuards(new roles_guard_1.RolesGuard(reflector, app.get(jwt_service_1.JwtService)));
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map