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
exports.deleteDecadev = exports.updateDecadev = exports.getAdecadev = exports.getAllDecadevs = exports.addDecadev = exports.loginPage = exports.mainPage = void 0;
const zod_1 = __importDefault(require("zod"));
const uuid_1 = require("uuid");
const Decadev_1 = __importDefault(require("../../model/Decadev"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const addDecadevSchema = zod_1.default.object({
    firstName: zod_1.default.string({
        required_error: "input first aame"
    }),
    lastName: zod_1.default.string({
        required_error: "input last name"
    }),
    squadNumber: zod_1.default.string({
        required_error: "input squad number"
    }),
    stack: zod_1.default.string({
        required_error: "input stack"
    }),
    email: zod_1.default.string({
        required_error: "input email address"
    }),
    password: zod_1.default.string({
        required_error: "input password"
    }),
});
const mainPage = (req, res, Next) => {
    req.on('error', (error) => {
        res.status(500).send(error);
    });
    res.status(200).render('index');
    return;
};
exports.mainPage = mainPage;
const loginPage = (req, res, Next) => {
    req.on('error', (error) => {
        res.status(500).send(error);
    });
    res.status(200).render('loginPage');
    return;
};
exports.loginPage = loginPage;
// ====   ADD DECADEV == //
const addDecadev = (req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
    req.on('error', (error) => {
        res.status(500).send(error);
    });
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
            message: `Decadev has been created!`,
            savedUser
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.addDecadev = addDecadev;
// == GET ALL DECADEVS == //
const getAllDecadevs = (req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
    req.on('error', (error) => {
        res.status(500).send(error);
    });
    const decadevs = yield Decadev_1.default.find();
    if (!decadevs)
        return res.status(204).json({ message: "No decadev was found!" });
    return res.json({
        status: 'success',
        method: req.method,
        message: `All Decadevs successfully loaded!`,
        decadevs
    });
    // res.json(decadevs);
});
exports.getAllDecadevs = getAllDecadevs;
// === GET A DECADEV ====//
const getAdecadev = (req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
    req.on('error', (error) => {
        res.status(500).send(error);
    });
    const Id = req.params.id;
    const decadev = yield Decadev_1.default.findById(Id);
    if (!decadev) {
        return res.status(204).json({
            message: `ID does not match.`
        });
    }
    else {
        return res.json({
            status: 'success',
            method: req.method,
            message: `A Decadev successfully loaded!`,
            decadev
        });
    }
});
exports.getAdecadev = getAdecadev;
// UPDATE DECADEV
const updateDecadev = (req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    req.on('error', (error) => {
        res.status(500).send(error);
    });
    const Id = req.params.id;
    const decadev = yield Decadev_1.default.findById(Id);
    if (!decadev) {
        return res.status(204).json({
            message: `ID does not match.`
        });
    }
    if (decadev) {
        if ((_a = req.body) === null || _a === void 0 ? void 0 : _a.email)
            decadev.email = req.body.email;
        if ((_b = req.body) === null || _b === void 0 ? void 0 : _b.firstName)
            decadev.firstName = req.body.firstName;
        if ((_c = req.body) === null || _c === void 0 ? void 0 : _c.lastName)
            decadev.lastName = req.body.lastName;
        if ((_d = req.body) === null || _d === void 0 ? void 0 : _d.stack)
            decadev.stack = req.body.stack;
        if ((_e = req.body) === null || _e === void 0 ? void 0 : _e.squadNumber)
            decadev.squadNumber = req.body.squadNumber;
        if ((_f = req.body) === null || _f === void 0 ? void 0 : _f.linkedinLink)
            decadev.linkedinLink = req.body.linkedinLink;
    }
    const updatedecadev = yield decadev.save();
    res.status(200).json({
        success: true,
        method: req.method,
        message: 'Profile updated successfully',
        updatedecadev
    });
});
exports.updateDecadev = updateDecadev;
// === UPDATE DECADEV === //
const deleteDecadev = (req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
    req.on('error', (error) => {
        res.status(500).send(error);
    });
    const Id = req.params.id;
    const decadev = yield Decadev_1.default.findByIdAndDelete(Id);
    if (!decadev) {
        return res.status(204).json({
            message: `No Decadev ID matches the ID that you provided.`
        });
    }
    if (decadev) {
        res.status(200).json({
            message: `Profile deleted successfully`,
            decadev
        });
    }
});
exports.deleteDecadev = deleteDecadev;
function v4() {
    throw new Error('Function not implemented.');
}
