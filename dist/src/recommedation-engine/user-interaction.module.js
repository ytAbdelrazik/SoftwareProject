"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_interaction_controller_1 = require("./user-interaction.controller");
const user_interaction_service_1 = require("./user-interaction.service");
const user_interaction_schema_1 = require("./user-interaction.schema");
let InteractionModule = class InteractionModule {
};
exports.InteractionModule = InteractionModule;
exports.InteractionModule = InteractionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_interaction_schema_1.UserInteraction.name, schema: user_interaction_schema_1.UserInteractionSchema },
            ]),
        ],
        controllers: [user_interaction_controller_1.InteractionController],
        providers: [user_interaction_service_1.InteractionService],
    })
], InteractionModule);
//# sourceMappingURL=user-interaction.module.js.map