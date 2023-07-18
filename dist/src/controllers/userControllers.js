"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogin = exports.userSignUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../model/User"));
const Decadev_1 = __importDefault(require("../../model/Decadev"));
const userSignUpSchema = zod_1.default.object({
    firstName: zod_1.default.string({
        required_error: "input first Name"
    }),
    lastName: zod_1.default.string({
        required_error: "input Last Name"
    }),
    squadNumber: zod_1.default.string({
        required_error: "What Squad were you in ?"
    }),
    stack: zod_1.default.string({
        required_error: "what was your stack"
    }),
    email: zod_1.default.string({
        required_error: "valid email is required"
    }).email(),
    password: zod_1.default.string({
        required_error: "input password"
    })
});
const userLoginSchema = zod_1.default.object({
    email: zod_1.default.string({
        required_error: "valid email required"
    }).email(),
    password: zod_1.default.string({
        required_error: "input password"
    })
});
const userSignUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, firstName, lastName, squadNumber, stack, linkedinLink, id } = req.body;
        const checkDuplicateUser = yield Decadev_1.default.findOne({ email: email }).exec();
        if (checkDuplicateUser) {
            return res.send({
                message: `Profile already exists!`
            });
        }
        const saltHassLength = 10;
        const salt = yield bcrypt_1.default.genSalt(saltHassLength);
        const hass = yield bcrypt_1.default.hash(password, salt);
        const user = yield Decadev_1.default.create({
            'id': (0, uuid_1.v4)(),
            'email': email,
            'password': hass,
            "firstName": firstName,
            'lastName': lastName,
            'squadNumber': squadNumber,
            'stack': stack,
            "linkedinLink": linkedinLink,
            'createdAt': new Date(),
            'updatedAt': new Date()
        });
        const savedUser = yield user.save();
        return res.json({
            status: 'success',
            method: req.method,
            message: `Your profile has been created!`,
            savedUser
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.userSignUp = userSignUp;
const userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const decadev = yield User_1.default.findOne({ email: email }).exec();
        if (!decadev) {
            return res.json({
                message: `Decadev not found!`
            });
        }
        if (decadev) {
            const validate = yield bcrypt_1.default.compare(password, decadev.password);
            if (validate) {
                const token = jsonwebtoken_1.default.sign(decadev.toObject(), "Ezeugo", {
                    expiresIn: 604800
                });
                return res.json({
                    status: "success",
                    method: req.method,
                    message: `Login Successful`,
                    token
                });
            }
        }
        else {
            return res.send({
                message: `Invalid details`
            });
        }
    }
    catch (err) {
        console.log(err);
    }
});
exports.userLogin = userLogin;
