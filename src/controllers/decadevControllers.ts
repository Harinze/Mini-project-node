import express, {NextFunction, Request, Response} from 'express';
import fs from 'fs';
import path from 'path'
import z from 'zod'
import { v4 as uuidv4 } from 'uuid';
import User from '../../model/User'
import Decadev from '../../model/Decadev';
import bcrypt from "bcrypt";




interface decadevInterface {
  firstName: string;
    lastName: string;
    squadNumber: Number;
    stack:  string;
    linkedIn: number;
    email: string;
    password: number;
    decadevId: string;
}

const addDecadevSchema = z.object({
  firstName: z.string({
    required_error: "input first aame"
  }),
  lastName: z.string({
      required_error: "input last name"
    }),
    squadNumber:  z.string({
      required_error: "input squad number"
    }),
    stack:  z.string({
      required_error: "input stack"
    }),
    email:  z.string({
      required_error: "input email address"
    }),
    password:  z.string({
      required_error: "input password"
    }),
});


export const mainPage = (req:Request, res:Response, Next:NextFunction)=>{
  req.on('error', (error)=>{
    res.status(500).send(error);
    })
  res.status(200).render('index');
  return;
}


export const loginPage = (req:Request, res:Response, Next:NextFunction)=>{
  req.on('error', (error)=>{
    res.status(500).send(error);
    })
  res.status(200).render('loginPage');
  return;
}


 // ====   ADD DECADEV == //

export const addDecadev = async (req:Request, res:Response, Next:NextFunction)=>{

    req.on('error', (error)=>{
    res.status(500).send(error);
    })

    try{
         

      const {email, password,firstName, lastName, squadNumber, stack, linkedinLink, id} = req.body;
           
       const checkDuplicateUser = await Decadev.findOne({email:email}).exec()
       
      
        if(checkDuplicateUser){
            return res.send({
                message: `Profile already exists!`
            })
        }
    
       const saltHassLength = 10;
       const salt = await bcrypt.genSalt(saltHassLength);
       const hass = await bcrypt.hash(password,salt);

       const user =  await Decadev.create({
        'id':uuidv4(),
       'email':email,
       'password':hass,
       "firstName": firstName,
       'lastName':lastName,
       'squadNumber':squadNumber,
       'stack': stack,
       "linkedinLink": linkedinLink,
       'createdAt':new Date(),
       'updatedAt':new Date()
      });

       const savedUser = await user.save()

       return res.json({
          status: 'success',
          method: req.method,
          message: `Decadev has been created!`,
          savedUser
       })
          }catch(err){
        console.log(err)
     }
    
    }
      
  // == GET ALL DECADEVS == //

  export const getAllDecadevs =  async (req:Request, res:Response, Next:NextFunction)=>{
    req.on('error', (error)=>{
      res.status(500).send(error);
    })

   const decadevs = await Decadev.find();
    if(!decadevs) return res.status(204).json({message: "No decadev was found!"})
    return res.json({
      status: 'success',
      method: req.method,
      message: `All Decadevs successfully loaded!`,
      decadevs
   })
    // res.json(decadevs);
 }

    // === GET A DECADEV ====//
  
    export const getAdecadev = async (req:Request, res:Response, Next:NextFunction)=>{
      req.on('error', (error)=>{
        res.status(500).send(error);
      })

      const Id = req.params.id
      const decadev = await Decadev.findById(Id);

      if(!decadev){
        return res.status(204).json({
          message: `ID does not match.`
        })
      }
   else{
     return res.json({
      status: 'success',
      method: req.method,
      message: `A Decadev successfully loaded!`,
      decadev
   })
   }
     }
  
                     // UPDATE DECADEV
  
    export const updateDecadev = async (req:Request, res:Response, Next:NextFunction)=>{
     
      req.on('error', (error)=>{
        res.status(500).send(error);
      })

      const Id = req.params.id
      const decadev = await Decadev.findById(Id);

      if(!decadev){
        return res.status(204).json({
          message: `ID does not match.`
        })
      }
    if(decadev) {
      if(req.body?.email) decadev.email = req.body.email;
      if(req.body?.firstName) decadev.firstName = req.body.firstName;
      if(req.body?.lastName) decadev.lastName = req.body.lastName;
      if(req.body?.stack) decadev.stack = req.body.stack;
      if(req.body?.squadNumber) decadev.squadNumber = req.body.squadNumber;
      if(req.body?.linkedinLink) decadev.linkedinLink = req.body.linkedinLink;
    }
      const updatedecadev = await decadev.save()

      res.status(200).json({
        success:true,
        method:req.method,
        message: 'Profile updated successfully',
        updatedecadev
    })

  }
    
        // === UPDATE DECADEV === //

  export const deleteDecadev = async (req:Request, res:Response, Next:NextFunction)=>{
  
  req.on('error', (error)=>{
    res.status(500).send(error);
  })

  const Id = req.params.id
  const decadev = await Decadev.findByIdAndDelete(Id);
  
  if(!decadev){
    return res.status(204).json({
      message: `No Decadev ID matches the ID that you provided.`
    })
  }
 
 if(decadev){
  res.status(200).json({
        message: `Profile deleted successfully`,
        decadev
      })
      }
    }
function v4() {
  throw new Error('Function not implemented.');
}
