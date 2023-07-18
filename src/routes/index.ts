import express, {Request, Response, NextFunction} from 'express';
import {mainPage, loginPage, addDecadev, getAllDecadevs, getAdecadev, updateDecadev, deleteDecadev} from '../controllers/decadevControllers'
import { auth } from '../middleware/auth';


const router = express.Router();

router.get('/mainpage', (req:Request, res:Response, Next:NextFunction)=>{
  mainPage(req, res, Next);
} );

router.get('/loginpage', (req:Request, res:Response, Next:NextFunction)=>{
  loginPage(req, res, Next);
});
// post book
router.post('/adddecadev', /**auth,*/ (req:Request, res:Response, Next:NextFunction)=>{
  addDecadev(req, res, Next);
})


// get all decadevs
router.get('/getalldecadevs', auth, function(req: Request, res: Response, Next: NextFunction) {
  getAllDecadevs(req, res, Next);
});

// get a decadev
router.get('/getadecadev/:id', auth, function(req: Request, res: Response, Next: NextFunction) {
  getAdecadev(req, res, Next); 
});

// update decadev profile
router.put('/updatedecadev/:id', (req:Request, res:Response, Next:NextFunction)=>{
  updateDecadev(req, res, Next);
});

// delete decadev
router.delete('/deletedecadev/:id',auth, (req:Request, res:Response, Next:NextFunction)=>{
  deleteDecadev(req, res, Next);
});




module.exports = router;



