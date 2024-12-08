"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const responses_schema_1 = require("./responses.schema");
const responses_service_1 = require("./responses.service");
const responses_controller_1 = require("./responses.controller");
let ResponseModule = class ResponseModule {
};
exports.ResponseModule = ResponseModule;
exports.ResponseModule = ResponseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: responses_schema_1.Response.name, schema: responses_schema_1.ResponseSchema }]),
        ],
        controllers: [responses_controller_1.ResponsesController],
        providers: [responses_service_1.ResponseService],
        exports: [responses_service_1.ResponseService],
    })
], ResponseModule);
//# sourceMappingURL=responses.module.js.map