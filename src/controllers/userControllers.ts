import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import jwt from 'jsonwebtoken'
import z from 'zod';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcrypt";
import User from '../../model/User'
import Decadev from '../../model/Decadev'

interface user{
  firstName: string;
  lastName: string;
  squadNumber: string;
  stack: string;
  linkedinLink: string;
  email: string;
  password: string;
  id: string;
}
  
  interface userLogin{
    email: string;
    password: string;
  }


   const userSignUpSchema = z.object({
      firstName: z.string({
        required_error: "input first Name"
      }),

      lastName: z.string({
        required_error: "input Last Name"
      }), 

      squadNumber: z.string({
        required_error: "What Squad were you in ?"
      }),

      stack: z.string({
        required_error: "what was your stack"
      }),

      email: z.string({
        required_error: "valid email is required"
      }).email(),
      password: z.string({
        required_error: "input password"
      })
  });

   const userLoginSchema = z.object({
    email: z.string({
      required_error: "valid email required"
    }).email(),
    password: z.string({
      required_error: "input password"
    })
});


export const userSignUp = async(req:Request, res:Response, next:NextFunction) => {
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
          message: `Your profile has been created!`,
          savedUser
       })
          }catch(err){
        console.log(err)
     }
}

export const userLogin = async(req:Request, res:Response, next:NextFunction)=>{
    try{

     
 const {email,password} = req.body;

    const decadev = await User.findOne({email:email}).exec();
      if(!decadev){
        return res.json({
          message: `Decadev not found!`
        })
      }
      
  if(decadev){
       const validate = await bcrypt.compare(password, decadev.password)
        if(validate){
            const token = jwt.sign(decadev.toObject(), "Ezeugo", {
              expiresIn: 604800 
            })
            return res.json({
                status: "success",
                method: req.method,
                message: `Login Successful`,
                token
            })
          }
        }else{
            return res.send({
                message: `Invalid details`
            })
        
    }


    }catch(err){console.log(err)}
}