"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const router = express_1.default.Router();
// ==== USER SIGNUP ====//
router.post('/usersignup', (req, res, Next) => {
    (0, userControllers_1.userSignUp)(req, res, Next);
});
// user login
router.post('/userlogin', (req, res, Next) => {
    (0, userControllers_1.userLogin)(req, res, Next);
});
module.exports = router;
