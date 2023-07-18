"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import { number } from 'zod';
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    roles: {
        user: {
            type: Number,
            default: 1000
        },
        Editor: Number,
        Admin: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
});
//module.exports = userSchema;
//module.exports = mongoose.model('User', userSchema)
exports.default = mongoose_1.default.model('User', userSchema);
