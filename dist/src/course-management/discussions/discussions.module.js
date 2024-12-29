"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscussionsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const discussions_service_1 = require("./discussions.service");
const discussions_controller_1 = require("./discussions.controller");
const discussions_schema_1 = require("./discussions.schema");
const comments_schema_1 = require("./comments.schema");
let DiscussionsModule = class DiscussionsModule {
};
exports.DiscussionsModule = DiscussionsModule;
exports.DiscussionsModule = DiscussionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: discussions_schema_1.Discussion.name, schema: discussions_schema_1.DiscussionSchema },
                { name: comments_schema_1.Comment.name, schema: comments_schema_1.CommentSchema },
            ]),
        ],
        controllers: [discussions_controller_1.DiscussionsController],
        providers: [discussions_service_1.DiscussionsService],
        exports: [discussions_service_1.DiscussionsService],
    })
], DiscussionsModule);
//# sourceMappingURL=discussions.module.js.map