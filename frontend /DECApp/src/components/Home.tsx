/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex-col">
      <h1 className="logo">Welcome to DECApp</h1>
      <div className="buttons flex justify-center justify-between">
        <div className=" signupDiv justify-around">
          <Link to="/login">
            <button className="logo loginButton ">Login</button>
          </Link>
          <p>Already Signed up ? Click here to log into your personal page</p>
        </div>
        <div className="loginDiv">
          <Link to="/signup">
            <button className="logo signupButton">Sign-up</button>
          </Link>
          <p>Click here to Sign-up for new users</p>
        </div>
      </div>
    </div>
  );
}
