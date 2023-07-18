/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
// import {useForm} from "react-hook-form";
// import express from "express";
import axiosInstance from "../../../../axios";
import { useState } from "react";

// const {register, handleSubmit, formState:{errors}} = useForm();

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [squadNumber, setSquadNumber] = useState("");
  const [stack, setStack] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  interface FormDataType {
    firstName: string;
    lastName: string;
    squadNumber: string;
    stack: string;
    linkedinLink: string;
    email: string;
    password: string;
  }
  const responseBody: FormDataType = {
    firstName: "",
    lastName: "",
    squadNumber: "",
    stack: "",
    linkedinLink: "",
    email: "",
    password: "",
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    responseBody.firstName = firstName;
    responseBody.lastName = lastName;
    responseBody.squadNumber = squadNumber;
    responseBody.stack = stack;
    responseBody.linkedinLink = linkedinLink;
    responseBody.email = email;
    responseBody.password = password;

    // console.log(JSON.stringify(responseBody))
    
    await axiosInstance({
      method: 'post',
      headers:{
        "Content-Type": "application/json"
      },
      url: '/decadev/adddecadev',
      data: responseBody
    });
    
    
    // await axiosInstance
    //   .post("/decadev/adddecadev", responseBody, {
    //     method: "POST",
    //     headers:{
    //       "Content-Type": "application/json"
    //     }
    //   })
    //Form submission happens here
  };
  const inputChangeHandler = (
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFunction(event.target.value);
  };

  return (
    <div>
      <h1 className="logo">Sign-up for DECApp</h1>
      <div className="formDiv">
        <form onSubmit={onSubmitHandler}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => inputChangeHandler(setFirstName, e)}
            placeholder="first-name"
          />
          <br />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => inputChangeHandler(setLastName, e)}
            placeholder="last-name"
          />
          <br />
          <input
            type="text"
            name="squadNumber"
            id="squadNumber"
            onChange={(e) => inputChangeHandler(setSquadNumber, e)}
            placeholder="squad-number"
          />
          <br />
          <input
            type="text"
            name="stack"
            id="stack"
            onChange={(e) => inputChangeHandler(setStack, e)}
            placeholder="stack-name"
          />
          <br />
          <input
            type="text"
            name="linkedinLink"
            id="linkedinLink"
            onChange={(e) => inputChangeHandler(setLinkedinLink, e)}
            placeholder="linkedin-link(optional)"
          />
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => inputChangeHandler(setEmail, e)}
            placeholder="email"
          />
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => inputChangeHandler(setPassword, e)}
            placeholder="password"
          />
          <br />
          <input type="submit" id="submit" />
        </form>
      </div>
    </div>
  );
}
