import express, { Request, Response, NextFunction } from 'express';
import {userSignUp, userLogin} from '../controllers/userControllers'


const router = express.Router();



interface user{
  firstName: string;
  lastName: string;
  squadNumber: string;
  stack: string;
  linkedinLink: string;
  email: string;
  password: string;
  id: number;
}

interface userLogin{
  email: string;
  password: string;
}


        // ==== USER SIGNUP ====//

router.post('/usersignup', (req: Request, res: Response, Next:NextFunction)=>{
  userSignUp(req, res, Next);
})

// user login
router.post('/userlogin', (req: Request, res: Response, Next:NextFunction)=>{
  userLogin(req, res, Next);
})




module.exports = router;
