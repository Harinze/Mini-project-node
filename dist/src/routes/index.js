"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const decadevControllers_1 = require("../controllers/decadevControllers");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/mainpage', (req, res, Next) => {
    (0, decadevControllers_1.mainPage)(req, res, Next);
});
router.get('/loginpage', (req, res, Next) => {
    (0, decadevControllers_1.loginPage)(req, res, Next);
});
// post book
router.post('/adddecadev', /**auth,*/ (req, res, Next) => {
    (0, decadevControllers_1.addDecadev)(req, res, Next);
});
// get all decadevs
router.get('/getalldecadevs', auth_1.auth, function (req, res, Next) {
    (0, decadevControllers_1.getAllDecadevs)(req, res, Next);
});
// get a decadev
router.get('/getadecadev/:id', auth_1.auth, function (req, res, Next) {
    (0, decadevControllers_1.getAdecadev)(req, res, Next);
});
// update decadev profile
router.put('/updatedecadev/:id', (req, res, Next) => {
    (0, decadevControllers_1.updateDecadev)(req, res, Next);
});
// delete decadev
router.delete('/deletedecadev/:id', auth_1.auth, (req, res, Next) => {
    (0, decadevControllers_1.deleteDecadev)(req, res, Next);
});
module.exports = router;
