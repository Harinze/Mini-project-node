"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const decadevSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    squadNumber: {
        type: String,
        required: true
    },
    stack: {
        type: String,
        required: true
    },
    linkedinLink: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
// module.exports = mongoose.model('Decadev', decadevSchema);
exports.default = mongoose_1.default.model('Decadev', decadevSchema);
